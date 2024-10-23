import * as S from 'effect/Schema'

export class PostSlugsRequest extends S.TaggedRequest<PostSlugsRequest>()(
  'PostSlugsRequest',
  {
    failure: S.Never,
    success: S.Array(
      S.Struct({
        workspaceSlug: S.NonEmptyTrimmedString,
        projectSlug: S.NonEmptyTrimmedString,
        postSlug: S.NonEmptyTrimmedString,
      }),
    ),
    payload: {},
  },
) {}
