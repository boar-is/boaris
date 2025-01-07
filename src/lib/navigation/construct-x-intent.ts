export const constructXIntent = (text: string, url: string) =>
  `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
