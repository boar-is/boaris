import * as S from 'effect/Schema'

export class ProjectSlugsRequest extends S.TaggedRequest<ProjectSlugsRequest>()(
  'ProjectSlugsRequest',
  {
    failure: S.Never,
    success: S.Array(
      S.Struct({
        workspaceSlug: S.NonEmptyTrimmedString,
        projectSlug: S.NonEmptyTrimmedString,
      }),
    ),
    payload: {},
  },
) {}
