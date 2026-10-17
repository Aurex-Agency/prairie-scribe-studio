import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'The Steward Podcast'
const YOUTUBE_URL = 'https://youtube.com/@thestewardpodcast'
const SPOTIFY_URL = 'https://open.spotify.com/show/7p2tCM7qRNsOmjox4cNhVE'

interface Props {
  email?: string
}

const NewsletterWelcome = (_: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You're in. New conversations from {SITE_NAME}, straight to your inbox.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>The Steward Podcast</Text>
        <Heading style={h1}>Welcome to the table.</Heading>
        <Hr style={rule} />
        <Text style={text}>
          You'll be the first to hear when a new conversation drops — honest talks with
          the ranchers, farmers, horsemen, rodeo athletes, and ag folks who live the
          western and agricultural way of life.
        </Text>
        <Text style={text}>
          No spam. No noise. Just the stories worth preserving.
        </Text>
        <Section style={ctaWrap}>
          <Link href={YOUTUBE_URL} style={cta}>Watch the latest episode →</Link>
        </Section>
        <Text style={small}>
          Prefer to listen? Find The Steward on{' '}
          <Link href={SPOTIFY_URL} style={inlineLink}>Spotify</Link> and Apple Podcasts.
        </Text>
        <Text style={signoff}>— The Steward</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: NewsletterWelcome,
  subject: "You're in — The Steward Podcast",
  displayName: 'Newsletter welcome',
  previewData: { email: 'jane@example.com' },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#1f1716',
}
const container = { padding: '32px 28px', maxWidth: '560px' }
const eyebrow = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.28em',
  textTransform: 'uppercase' as const,
  color: '#7a0014',
  margin: '0 0 18px',
  fontWeight: 700,
}
const h1 = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '30px',
  lineHeight: '1.15',
  color: '#1f1716',
  margin: '0 0 16px',
  letterSpacing: '0.01em',
}
const rule = { borderColor: '#e8e2d8', margin: '20px 0 24px' }
const text = { fontSize: '16px', lineHeight: '1.65', color: '#3a302d', margin: '0 0 18px' }
const ctaWrap = { margin: '26px 0 22px' }
const cta = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '13px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: '#ffffff',
  background: '#7a0014',
  padding: '13px 22px',
  textDecoration: 'none',
  fontWeight: 700,
  display: 'inline-block',
}
const small = { fontSize: '14px', lineHeight: '1.6', color: '#3a302d', margin: '0 0 18px' }
const inlineLink = { color: '#7a0014', textDecoration: 'underline' }
const signoff = { fontSize: '15px', fontStyle: 'italic' as const, color: '#1f1716', margin: '28px 0 0' }
