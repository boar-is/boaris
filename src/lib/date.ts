const timestampToDateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})
export const timestampToDate = (timestamp: number) =>
  timestampToDateFormatter.format(new Date(timestamp))
