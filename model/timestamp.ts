import { Brand } from 'effect'

export type Timestamp = number & Brand.Brand<'Timestamp'>
export const Timestamp = Brand.nominal<Timestamp>()

const readableDateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const readable = (timestamp: Timestamp) =>
  readableDateFormat.format(new Date(timestamp))
