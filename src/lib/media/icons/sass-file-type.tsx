import { ImageIconBase, type ImageIconProps } from './_base'
import sassFileType from './sass-file-type.svg'

export function SassFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={sassFileType} alt="Sass file type" {...props} />
}
