import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { AssetBase, assetBase } from './assetBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export const assetText = v.object({
  ...assetBase.fields,
  type: v.literal('text'),
  value: v.string(),
})

export class AssetText extends AssetBase.extend<AssetText>('AssetText')({
  type: Schema.Literal('text'),
  value: Schema.String,
}) {
  static encodedFromEntity({
    type,
    value,
    ...base
  }: Infer<typeof assetText>): typeof AssetText.Encoded {
    return {
      type,
      value,
      ...AssetBase.encodedFromEntity(base),
    }
  }
}
