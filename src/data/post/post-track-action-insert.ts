import * as S from '@effect/schema/Schema'
import { PostTrackActionBase } from '~/data/post/post-track-action-base'

export class PostTrackActionInsert extends PostTrackActionBase.extend<PostTrackActionInsert>(
  'PostTrackActionInsert',
)({
  type: S.Literal('insert'),
  from: S.Number,
  to: S.OptionFromUndefinedOr(S.Number),
  length: S.Number,
  value: S.OptionFromUndefinedOr(S.String),
}) {}
