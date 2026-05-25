import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  topic?: string
  message?: string
}

const ContactNotification = ({ name, email, topic, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission{topic ? ` — ${topic}` : ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>New Contact Submission</Text>
        <Heading style={h1}>
          {topic ? `${topic}` : 'New message from the site'}
        </Heading>
        <Hr style={rule} />

        <Section style={row}>
          <Text style={label}>From</Text>
          <Text style={value}>{name || '(no name provided)'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Email</Text>
          <Text style={value}>{email || '(no email provided)'}</Text>
        </Section>
        <Section style={row}>
          <Text style={label}>Topic</Text>
          <Text style={value}>{topic || 'General Message'}</Text>
        </Section>

        <Hr style={rule} />
        <Text style={label}>Message</Text>
        <Text style={messageBox}>{message || '(no message)'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotification,
  subject: (data: Record<string, any>) =>
    `New contact: ${data?.topic || 'Message'}${data?.name ? ` — ${data.name}` : ''}`,
  displayName: 'Contact form notification',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    topic: 'Guest Suggestion',
    message: 'I have someone you should talk to...',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#1f1716',
}
const container = { padding: '32px 28px', maxWidth: '600px' }
const eyebrow = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.28em',
  textTransform: 'uppercase' as const,
  color: '#7a0014',
  margin: '0 0 14px',
  fontWeight: 700,
}
const h1 = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '26px',
  lineHeight: '1.2',
  color: '#1f1716',
  margin: '0 0 8px',
}
const rule = { borderColor: '#e8e2d8', margin: '18px 0' }
const row = { margin: '0 0 12px' }
const label = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '11px',
  letterSpacing: '0.22em',
  textTransform: 'uppercase' as const,
  color: '#7a0014',
  margin: '0 0 4px',
  fontWeight: 700,
}
const value = { fontSize: '15px', color: '#1f1716', margin: 0 }
const messageBox = {
  fontSize: '15px',
  lineHeight: '1.65',
  color: '#1f1716',
  background: '#faf6ef',
  padding: '16px 18px',
  borderLeft: '3px solid #7a0014',
  whiteSpace: 'pre-wrap' as const,
  margin: '6px 0 0',
}
