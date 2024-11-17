import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { Id } from '~/convex/_generated/dataModel'
import { ChangeSetFromJson } from '~/lib/codemirror/change-set-schema'
import { EditorSelectionFromSerialized } from '~/lib/codemirror/editor-selection-schema'
import { TextFromStringArray } from '~/lib/codemirror/text-schema'
import { AssetBase, assetBase } from './assetBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export const assetText = v.object({
  ...assetBase.fields,
  type: v.literal('text'),
  value: v.array(v.string()),
  changes: v.array(v.any()),
})

export class AssetText extends AssetBase.extend<AssetText>('AssetText')({
  type: Schema.Literal('text'),
  value: TextFromStringArray,
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
        ChangeSetFromJson,
        Schema.UndefinedOr(EditorSelectionFromSerialized),
      ),
    ),
  ),
}) {
  static encodedFromEntity({
    type,
    value,
    changes,
    ...base
  }: Infer<typeof assetText> & {
    _id: Id<'assets'>
  }): typeof AssetText.Encoded {
    return {
      ...AssetBase.encodedFromEntity(base),
      type,
      value,
      changes,
    }
  }
}

export type AssetTextChange = (typeof AssetText.Type)['changes'][number]
