import { ImageIconBase, type ImageIconProps } from './_base'
import imageFileType from './image-file-type.svg'

export function ImageFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={imageFileType} alt="Image file type" {...props} />
}
