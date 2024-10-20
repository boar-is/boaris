import * as S from '@effect/schema/Schema'
import { PostTrackBase } from '~/data/post/post-track-base'

export class PostTrackImageStatic extends PostTrackBase.extend<PostTrackImageStatic>(
  'PostTrackImageStatic',
)({
  type: S.Literal('image-static'),
  url: S.NonEmptyTrimmedString,
  caption: S.Option(S.NonEmptyTrimmedString),
  alt: S.Option(S.NonEmptyTrimmedString),
}) {}
