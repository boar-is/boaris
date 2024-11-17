import type { Option } from 'effect'
import type { AssetBase } from './assetBase'

export type AssetImageStatic = AssetBase & {
  type: 'image-static'
  href: string
  caption: Option.Option<string>
  alt: Option.Option<string>
}
