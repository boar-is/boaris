import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import type { action } from './action'
import { Captions, captions } from './captions'
import { Layout, layout } from './layout'
import { Track, track, trackEncodedFromEntity } from './track'

export const revision = v.object({
  captions: v.optional(captions),
  layout,
  tracks: v.array(track),
})

export class Revision extends S.Class<Revision>('Revision')({
  captions: S.OptionFromUndefinedOr(Captions),
  layout: Layout,
  tracks: S.Array(Track),
}) {
  static async encodedFromEntity(
    { captions, layout, tracks }: Infer<typeof revision>,
    actionsByTrackId: Record<string, Array<Infer<typeof action>>>,
    { getUrl }: PropsWithGetUrl,
  ): Promise<typeof Revision.Encoded> {
    return {
      captions: captions && Captions.encodedFromEntity(captions),
      layout: Layout.encodedFromEntity(layout),
      tracks: await Promise.all(
        tracks.map((it) =>
          trackEncodedFromEntity(it, actionsByTrackId[it.id] ?? [], {
            getUrl,
          }),
        ),
      ),
    }
  }
}
