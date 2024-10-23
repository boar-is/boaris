import * as S from 'effect/Schema'

export class WorkspaceSlugsRequest extends S.TaggedRequest<WorkspaceSlugsRequest>()(
  'WorkspaceSlugsRequest',
  {
    failure: S.Never,
    success: S.Array(
      S.Struct({
        workspaceSlug: S.NonEmptyTrimmedString,
      }),
    ),
    payload: {},
  },
) {}
