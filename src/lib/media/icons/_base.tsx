import type { ComponentPropsWithoutRef } from 'react'
import { Image } from '~/lib/media/image'
import { cx } from '~/lib/react/cx'

export type SvgIconProps = ComponentPropsWithoutRef<'svg'>
export type ImageIconProps = { className?: string | undefined }

export function ImageIconBase({
  className,
  src,
  alt,
  ...props
}: ImageIconProps & { src: string; alt: string }) {
  return (
    <div className={cx('relative', className)} {...props}>
      <Image src={src} alt={alt} fill />
    </div>
  )
}
