import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { TrackBase, trackBase } from './trackBase'

export const trackImageDynamic = v.object({
  ...trackBase.fields,
  type: v.literal('image-dynamic'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
})

export class TrackImageDynamic extends TrackBase.extend<TrackImageDynamic>(
  'TrackImageDynamic',
)({
  type: S.Literal('image-dynamic'),
  url: S.NonEmptyTrimmedString,
  caption: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
}) {}
