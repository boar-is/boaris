import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { TrackBase, trackBase } from './trackBase'

export const trackImageStatic = v.object({
  ...trackBase.fields,
  type: v.literal('image-static'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
  alt: v.optional(v.string()),
})

export class TrackImageStatic extends TrackBase.extend<TrackImageStatic>(
  'TrackImageStatic',
)({
  type: S.Literal('image-static'),
  url: S.NonEmptyTrimmedString,
  caption: S.Option(S.NonEmptyTrimmedString),
  alt: S.Option(S.NonEmptyTrimmedString),
}) {}
