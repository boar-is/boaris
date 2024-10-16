import { ImageIconBase, type ImageIconProps } from './_base'
import defaultFileType from './default-file-type.svg'

export function DefaultFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase src={defaultFileType} alt="Default file type" {...props} />
  )
}
