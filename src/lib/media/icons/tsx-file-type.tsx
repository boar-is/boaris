import { ImageIconBase, type ImageIconProps } from './_base'
import tsxFileType from './tsx-file-type.svg'

export function TsxFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={tsxFileType} alt="TSX file type" {...props} />
}
