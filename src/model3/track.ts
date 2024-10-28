import { type Infer, v } from 'convex/values'
import { Match } from 'effect'
import { TrackTextChanges, trackTextChanges } from '~/model3/trackTextChanges'

export const track = v.union(trackTextChanges)
export const trackEncodedFromEntity = (t: Infer<typeof track>) =>
  Match.value(t).pipe(
    Match.when(
      { assetType: 'text', type: 'changes' },
      TrackTextChanges.encodedFromEntity,
    ),
    Match.exhaustive,
  )
