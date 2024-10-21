const readableDateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const readableDate = (date: Date) => readableDateFormat.format(date)
