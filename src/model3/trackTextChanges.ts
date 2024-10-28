import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { NonEmptyReadonlyArray } from 'effect/Array'
import { ChangeSetSchema } from '~/lib/codemirror/change-set-schema'
import { EditorSelectionSchema } from '~/lib/codemirror/editor-selection-schema'
import { TrackBase, trackBase } from './trackBase'

export const trackTextChanges = v.object({
  ...trackBase.fields,
  assetType: v.literal('text'),
  type: v.literal('changes'),
  changes: v.array(v.any()),
})

export class TrackTextChanges extends Schema.Class<TrackTextChanges>(
  'TrackTextChanges',
)({
  ...TrackBase.fields,
  assetType: Schema.Literal('text'),
  type: Schema.Literal('changes'),
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
  static combineManyEncoded(
    array: NonEmptyReadonlyArray<typeof TrackTextChanges.Encoded>,
  ): typeof TrackTextChanges.Encoded {
    const changes: Array<(typeof TrackTextChanges.Encoded)['changes'][number]> =
      []

    for (const item of array) {
    }

    return {
      ...TrackBase.encodedFromEntity({}),
    }
  }

  static encodedFromEntity({
    assetType,
    type,
    changes,
    ...base
  }: Infer<typeof trackTextChanges>): typeof TrackTextChanges.Encoded {
    return {
      ...TrackBase.encodedFromEntity(base),
      assetType,
      type,
      changes,
    }
  }
}
