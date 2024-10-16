import { ImageIconBase, type ImageIconProps } from './_base'
import jsonFileType from './json-file-type.svg'

export function JsonFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={jsonFileType} alt="JSON file type" {...props} />
}
