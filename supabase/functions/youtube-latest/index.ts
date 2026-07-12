import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

// Returns the channel's latest full-length episodes for the website's
// "Latest episodes" section, so it updates automatically when a new episode
// is posted — no manual edits required.
//
// Strategy (best result first):
//   1. YouTube Data API v3 (if YOUTUBE_API_KEY is set): pulls a wide window of
//      uploads and filters out Shorts by duration. Reliable even on a channel
//      that posts many Shorts between episodes.
//   2. RSS feed fallback (no key needed): the public channel feed, filtered to
//      long-form /watch videos. Limited to the 15 most recent uploads.
// Results are cached in-memory to keep API quota/traffic low.

const CHANNEL_ID = Deno.env.get('YOUTUBE_CHANNEL_ID') ?? 'UCE3PH74TtOcXff565peWTdQ'
const API_KEY = Deno.env.get('YOUTUBE_API_KEY') ?? ''
// Minimum length (seconds) for something to count as an episode vs a Short/clip.
const MIN_DURATION = Number(Deno.env.get('YOUTUBE_MIN_DURATION_SECONDS') ?? '180')
const MAX_ITEMS = 6
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes

interface Video {
  id: string
  title: string
  description: string
  publishedAt: string
}
interface Payload {
  source: 'api' | 'rss'
  featured: Video | null
  recent: Video[]
  channelUrl: string
  fetchedAt: string
}

let cache: { at: number; payload: Payload } | null = null

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

// Parse an ISO-8601 duration (e.g. "PT1H2M3S") into seconds.
function isoDurationToSeconds(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return 0
  const [, h, min, s] = m
  return (Number(h) || 0) * 3600 + (Number(min) || 0) * 60 + (Number(s) || 0)
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
}

async function fromDataApi(): Promise<Payload | null> {
  if (!API_KEY) return null
  // Uploads playlist id is the channel id with the "UC" prefix swapped for "UU".
  const uploads = 'UU' + CHANNEL_ID.slice(2)
  const listUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems')
  listUrl.searchParams.set('part', 'snippet,contentDetails')
  listUrl.searchParams.set('maxResults', '50')
  listUrl.searchParams.set('playlistId', uploads)
  listUrl.searchParams.set('key', API_KEY)

  const listRes = await fetch(listUrl)
  if (!listRes.ok) throw new Error(`playlistItems ${listRes.status}: ${await listRes.text()}`)
  const list = await listRes.json()
  const items: { id: string; title: string; description: string; publishedAt: string }[] =
    (list.items ?? []).map((it: Record<string, any>) => ({
      id: it.contentDetails?.videoId,
      title: it.snippet?.title ?? '',
      description: it.snippet?.description ?? '',
      publishedAt: it.contentDetails?.videoPublishedAt ?? it.snippet?.publishedAt ?? '',
    })).filter((v: Video) => v.id)

  if (!items.length) return null

  // Fetch durations to filter out Shorts/clips.
  const detailsUrl = new URL('https://www.googleapis.com/youtube/v3/videos')
  detailsUrl.searchParams.set('part', 'contentDetails')
  detailsUrl.searchParams.set('id', items.map((v) => v.id).join(','))
  detailsUrl.searchParams.set('key', API_KEY)
  const detailsRes = await fetch(detailsUrl)
  if (!detailsRes.ok) throw new Error(`videos ${detailsRes.status}: ${await detailsRes.text()}`)
  const details = await detailsRes.json()
  const durations = new Map<string, number>()
  for (const d of details.items ?? []) {
    durations.set(d.id, isoDurationToSeconds(d.contentDetails?.duration ?? 'PT0S'))
  }

  const episodes = items
    .filter((v) => (durations.get(v.id) ?? 0) >= MIN_DURATION)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, MAX_ITEMS)

  if (!episodes.length) return null

  return {
    source: 'api',
    featured: episodes[0],
    recent: episodes.slice(1),
    channelUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
    fetchedAt: new Date().toISOString(),
  }
}

async function fromRss(): Promise<Payload | null> {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`)
  if (!res.ok) throw new Error(`rss ${res.status}`)
  const xml = await res.text()
  const entries = xml.split('<entry>').slice(1)
  const videos: Video[] = []
  for (const e of entries) {
    const link = e.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? ''
    // The /videos tab excludes Shorts; the RSS feed marks Shorts with a
    // /shorts/ link, so skip those to keep only long-form episodes.
    if (link.includes('/shorts/')) continue
    const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    if (!id) continue
    const title = decodeEntities(e.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
    const description = decodeEntities(
      e.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? '',
    ).split('\n')[0]
    const publishedAt = e.match(/<published>([^<]+)<\/published>/)?.[1] ?? ''
    videos.push({ id, title, description, publishedAt })
  }
  if (!videos.length) return null
  const top = videos.slice(0, MAX_ITEMS)
  return {
    source: 'rss',
    featured: top[0],
    recent: top.slice(1),
    channelUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
    fetchedAt: new Date().toISOString(),
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return json({ ...cache.payload, cached: true })
  }

  try {
    const payload = (await fromDataApi()) ?? (await fromRss())
    if (!payload) return json({ error: 'No episodes found' }, 502)
    cache = { at: Date.now(), payload }
    return json(payload)
  } catch (err) {
    // If the API path throws (bad key, quota), try RSS before giving up.
    try {
      const payload = await fromRss()
      if (payload) {
        cache = { at: Date.now(), payload }
        return json(payload)
      }
    } catch { /* fall through */ }
    return json({ error: err instanceof Error ? err.message : 'Failed to load episodes' }, 502)
  }
})
