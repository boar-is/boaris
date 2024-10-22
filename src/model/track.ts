import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import * as M from 'effect/Match'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import type { action } from './action'
import { TrackImageDynamic, trackImageDynamic } from './trackImageDynamic'
import { TrackImageStatic, trackImageStatic } from './trackImageStatic'
import { TrackText, trackText } from './trackText'

export const track = v.union(trackImageDynamic, trackImageStatic, trackText)

export const Track = S.Union(TrackImageDynamic, TrackImageStatic, TrackText)
export const trackEncodedFromEntity = async (
  t: Infer<typeof track>,
  actions: Array<Infer<typeof action>>,
  withGetUrl: PropsWithGetUrl,
): Promise<typeof Track.Encoded> =>
  M.value(t).pipe(
    M.when(
      { type: 'image-dynamic' },
      TrackImageDynamic.encodedFromEntity(withGetUrl)(actions),
    ),
    M.when(
      { type: 'image-static' },
      TrackImageStatic.encodedFromEntity(withGetUrl)(actions),
    ),
    M.when({ type: 'text' }, TrackText.encodedFromEntity(actions)),
    M.exhaustive,
  )
