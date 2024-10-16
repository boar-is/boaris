import { ImageIconBase, type ImageIconProps } from './_base'
import htmlFileType from './html-file-type.svg'

export function HtmlFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={htmlFileType} alt="HTML file type" {...props} />
}
