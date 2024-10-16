import { ImageIconBase, type ImageIconProps } from './_base'
import typescriptFileType from './typescript-file-type.svg'

export function TypeScriptFileTypeIcon(props: ImageIconProps) {
  return (
    <ImageIconBase
      src={typescriptFileType}
      alt="TypeScript file type"
      {...props}
    />
  )
}
