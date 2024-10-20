import * as S from '@effect/schema/Schema'

export class PostTrackActionBase extends S.Class<PostTrackActionBase>(
  'PostTrackActionBase',
)({
  offset: S.Number,
}) {}
