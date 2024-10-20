import * as S from '@effect/schema/Schema'
import { PostTrackBase } from '~/data/post/post-track-base'

export class PostTrackImageDynamic extends PostTrackBase.extend<PostTrackImageDynamic>(
  'PostTrackImageDynamic',
)({
  type: S.Literal('image-dynamic'),
  url: S.NonEmptyTrimmedString,
  caption: S.Option(S.NonEmptyTrimmedString),
}) {}
