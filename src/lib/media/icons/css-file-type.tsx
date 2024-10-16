import { ImageIconBase, type ImageIconProps } from './_base'
import cssFileType from './css-file-type.svg'

export function CssFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={cssFileType} alt="CSS file type" {...props} />
}
