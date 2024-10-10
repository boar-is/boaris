const creationTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

export const formatCreationTime = (timestamp: number) =>
  creationTimeFormat.format(new Date(timestamp))
