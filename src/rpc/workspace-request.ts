import * as S from 'effect/Schema'
import { Workspace } from '~/model/workspace'

export class WorkspaceRequest extends S.TaggedRequest<WorkspaceRequest>()(
  'WorkspaceRequest',
  {
    failure: S.Never,
    success: S.Union(
      S.Null,
      S.Struct({
        workspace: Workspace,
      }),
    ),
    payload: {
      workspaceSlug: S.NonEmptyTrimmedString,
    },
  },
) {}
