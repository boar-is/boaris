import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { TrackTextChange } from './trackTextChange'

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
      TrackTextChange,
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
