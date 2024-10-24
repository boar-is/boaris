import { Schema } from 'effect'
import { Workspace } from '~/model/workspace'

export class WorkspaceRequest extends Schema.TaggedRequest<WorkspaceRequest>()(
  'WorkspaceRequest',
  {
    failure: Schema.Never,
    success: Schema.Union(
      Schema.Null,
      Schema.Struct({
        workspace: Workspace,
      }),
    ),
    payload: {
      workspaceSlug: Schema.NonEmptyTrimmedString,
    },
  },
) {}
