import { type Infer, v } from 'convex/values'
import { Match, Schema } from 'effect'

import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import { AssetImageDynamic, assetImageDynamic } from './assetImageDynamic'
import { AssetImageStatic, assetImageStatic } from './assetImageStatic'
import { AssetText, assetText } from './assetText'

export const asset = v.union(assetImageDynamic, assetImageStatic, assetText)

export const Asset = Schema.Union(
  AssetImageDynamic,
  AssetImageStatic,
  AssetText,
)

export const assetEncodedFromEntity =
  (withGetUrl: PropsWithGetUrl) =>
  async (t: Infer<typeof asset>): Promise<typeof Asset.Encoded> =>
    Match.value(t).pipe(
      Match.when(
        { type: 'image-dynamic' },
        AssetImageDynamic.encodedFromEntity(withGetUrl),
      ),
      Match.when(
        { type: 'image-static' },
        AssetImageStatic.encodedFromEntity(withGetUrl),
      ),
      Match.when({ type: 'text' }, AssetText.encodedFromEntity),
      Match.exhaustive,
    )
