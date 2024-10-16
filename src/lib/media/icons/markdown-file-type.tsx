import { ImageIconBase, type ImageIconProps } from './_base'
import markdownFileType from './markdown-file-type.svg'

export function MarkdownFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase src={markdownFileType} alt="Markdown file type" {...props} />
  )
}
