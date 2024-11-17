import type { Option } from 'effect'
import type { AssetBase } from './assetBase'

export type AssetImageDynamic = AssetBase & {
  type: 'image-dynamic'
  href: string
  caption: Option.Option<string>
}
