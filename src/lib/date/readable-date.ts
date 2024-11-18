import { DateTime } from 'effect'

const readableDateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const readableDate = (date: DateTime.DateTime) =>
  readableDateFormat.format(date.pipe(DateTime.toDate))
