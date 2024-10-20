import * as S from '@effect/schema/Schema'

export class PostTrackActionInsert extends S.TaggedClass<PostTrackActionInsert>()(
  'PostTrackActionInsert',
  {
    offset: S.Number,
    from: S.Number,
    to: S.OptionFromUndefinedOr(S.Number),
    length: S.Number,
    value: S.OptionFromUndefinedOr(S.String),
  },
) {}
