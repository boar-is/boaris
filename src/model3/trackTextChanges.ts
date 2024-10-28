import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { ChangeSetSchema } from '~/lib/codemirror/change-set-schema'
import { EditorSelectionSchema } from '~/lib/codemirror/editor-selection-schema'
import { TrackBase, trackBase } from './trackBase'

export const trackTextChanges = v.object({
  assetType: v.literal('text'),
  type: v.literal('changes'),
  changes: v.array(v.any()),
  ...trackBase.fields,
})

export class TrackTextChanges extends Schema.Class<TrackTextChanges>(
  'TrackTextChanges',
)({
  assetId: Schema.String,
  assetType: Schema.Literal('text'),
  type: Schema.Literal('changes'),
  offset: Schema.Number,
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
    assetType,
    type,
    changes,
    ...base
  }: Infer<typeof trackTextChanges>): typeof TrackTextChanges.Encoded {
    return {
      assetType,
      type,
      changes,
      ...TrackBase.encodedFromEntity(base),
    }
  }
}
