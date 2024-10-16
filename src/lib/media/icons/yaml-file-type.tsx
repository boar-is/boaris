import { ImageIconBase, type ImageIconProps } from './_base'
import yamlFileType from './yaml-file-type.svg'

export function YamlFileTypeIcon(props: ImageIconProps) {
  return <ImageIconBase src={yamlFileType} alt="YAML file type" {...props} />
}
