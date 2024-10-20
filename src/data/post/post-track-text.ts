import * as S from '@effect/schema/Schema'
import { PostTrackBase } from '~/data/post/post-track-base'

export class PostTrackText extends PostTrackBase.extend<PostTrackText>(
  'PostTrackText',
)({
  type: S.Literal('text'),
  value: S.NonEmptyTrimmedString,
}) {}
