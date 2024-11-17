import { Schema } from 'effect'
import { AssetImageDynamic } from './assetImageDynamic'
import { AssetImageStatic } from './assetImageStatic'
import { AssetText } from './assetText'

export const Asset = Schema.Union(
  AssetImageDynamic,
  AssetImageStatic,
  AssetText,
)
