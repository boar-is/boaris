import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { ChangeSetSchema } from '~/lib/codemirror/change-set-schema'
import { EditorSelectionSchema } from '~/lib/codemirror/editor-selection-schema'

export const trackTextChanges = v.object({
  assetId: v.id('assets'),
  assetType: v.literal('text'),
  offset: v.number(),
  changes: v.array(v.any()),
})

export class TrackTextChanges extends Schema.Class<TrackTextChanges>(
  'TrackTextChanges',
)({
  assetId: Schema.String,
  assetType: Schema.Literal('text'),
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
    assetId,
    assetType,
    offset,
    changes,
  }: Infer<typeof trackTextChanges>): typeof TrackTextChanges.Encoded {
    return {
      assetId,
      assetType,
      offset,
      changes,
    }
  }
}
