import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'The Steward Podcast'

interface Props {
  name?: string
  topic?: string
}

const ContactConfirmation = ({ name, topic }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Message received — thank you for reaching out to {SITE_NAME}.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>The Steward Podcast</Text>
        <Heading style={h1}>
          {name ? `Thank you, ${name}.` : 'Thank you for reaching out.'}
        </Heading>
        <Hr style={rule} />
        <Text style={text}>
          Your message has landed at the table. If the story belongs here, we'll be
          in touch soon.
        </Text>
        {topic ? (
          <Section style={meta}>
            <Text style={metaLabel}>You reached out about</Text>
            <Text style={metaValue}>{topic}</Text>
          </Section>
        ) : null}
        <Text style={text}>
          In the meantime, sit a while with a recent conversation — they're built for
          the long haul, not the scroll.
        </Text>
        <Text style={signoff}>— The Steward</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmation,
  subject: 'Message received — The Steward Podcast',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane', topic: 'Guest Suggestion' },
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
const meta = { background: '#faf6ef', padding: '16px 18px', margin: '18px 0 22px', borderLeft: '3px solid #7a0014' }
const metaLabel = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: '#7a0014',
  margin: '0 0 4px',
  fontWeight: 700,
}
const metaValue = { fontSize: '15px', color: '#1f1716', margin: 0 }
const signoff = { fontSize: '15px', fontStyle: 'italic' as const, color: '#1f1716', margin: '28px 0 0' }
