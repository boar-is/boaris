import { type Infer, v } from 'convex/values'
import { Match, Schema } from 'effect'

import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import type { action } from './action'
import { TrackImageDynamic, trackImageDynamic } from './trackImageDynamic'
import { TrackImageStatic, trackImageStatic } from './trackImageStatic'
import { TrackText, trackText } from './trackText'

export const track = v.union(trackImageDynamic, trackImageStatic, trackText)

export const Track = Schema.Union(
  TrackImageDynamic,
  TrackImageStatic,
  TrackText,
)
export const trackEncodedFromEntity = async (
  t: Infer<typeof track>,
  actions: Array<Infer<typeof action>>,
  withGetUrl: PropsWithGetUrl,
): Promise<typeof Track.Encoded> =>
  Match.value(t).pipe(
    Match.when(
      { type: 'image-dynamic' },
      TrackImageDynamic.encodedFromEntity(withGetUrl)(actions),
    ),
    Match.when(
      { type: 'image-static' },
      TrackImageStatic.encodedFromEntity(withGetUrl)(actions),
    ),
    Match.when({ type: 'text' }, TrackText.encodedFromEntity(actions)),
    Match.exhaustive,
  )
