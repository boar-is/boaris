export { default as Image, type ImageProps } from 'next/image'

export const sizesFromVw = (vw: number) =>
  `(max-width: 1024px) 100vw, min(${vw}vw, 1080px)`

export const defaultImageSizes = sizesFromVw(50)
