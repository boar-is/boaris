import { ImageIconBase, type ImageIconProps } from './_base'
import javascriptFileType from './javascript-file-type.svg'

export function JavaScriptFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase
      src={javascriptFileType}
      alt="JavaScript file type"
      {...props}
    />
  )
}
