const readableDateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const readableFromTimestamp = (timestamp: number) =>
  readableDateFormat.format(new Date(timestamp))
