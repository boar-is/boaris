import { ImageIconBase, type ImageIconProps } from './_base'
import shellFileType from './shell-file-type.svg'

export function ShellFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={shellFileType} alt="Shell file type" {...props} />
}
