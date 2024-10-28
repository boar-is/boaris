import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { ChangeSetSchema } from '~/lib/codemirror/change-set-schema'
import { EditorSelectionSchema } from '~/lib/codemirror/editor-selection-schema'
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
  changes: v.array(v.any()),
})

export class AssetText extends AssetBase.extend<AssetText>('AssetText')({
  ...AssetBase.fields,
  type: Schema.Literal('text'),
  value: Schema.String,
  changes: Schema.Array(
    Schema.Tuple(
      /**
       * The offset
       */
      Schema.Number,
      /**
       * @see https://codemirror.net/docs/ref/#state.TransactionSpec
       */
      Schema.Tuple(
        /**
         * Type of the change
         */
        Schema.Literal(0),
        ChangeSetSchema,
        EditorSelectionSchema,
      ),
    ),
  ),
}) {
  static encodedFromEntity({
    type,
    value,
    changes,
    ...base
  }: Infer<typeof assetText>): typeof AssetText.Encoded {
    return {
      ...AssetBase.encodedFromEntity(base),
      type,
      value,
      changes,
    }
  }
}
