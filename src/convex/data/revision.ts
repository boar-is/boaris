import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { Captions, captions } from './captions'
import { Layout, layout } from './layout'
import { Track, track } from './track'

export const revision = v.object({
  captions: v.optional(captions),
  layout: layout,
  tracks: v.array(track),
})

export class Revision extends S.Class<Revision>('Revision')({
  captions: S.OptionFromUndefinedOr(Captions),
  layout: Layout,
  tracks: S.Array(Track),
}) {}
