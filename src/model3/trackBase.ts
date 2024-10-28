import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const trackBase = v.object({
  assetId: v.id('assets'),
  offset: v.number(),
})

export class TrackBase extends Schema.Class<TrackBase>('TrackBase')({
  assetId: Schema.String,
  offset: Schema.Number,
}) {
  static encodedFromEntity({
    assetId,
    offset,
  }: Infer<typeof trackBase>): typeof TrackBase.Encoded {
    return {
      assetId,
      offset,
    }
  }
}
