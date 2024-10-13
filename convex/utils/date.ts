const creationTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const formatCreationTime = (timestamp: number) =>
  creationTimeFormat.format(new Date(timestamp))
