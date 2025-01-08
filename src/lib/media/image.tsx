export { default as Image, type ImageProps } from 'next/image'

export const sizesFromVw = (vw: number) => `(max-width: 1024px) 100vw, ${vw}vw`

export const defaultImageSizes = sizesFromVw(33)
