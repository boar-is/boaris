import { Schema } from 'effect'
import { User } from '~/model/user'
import { Workspace } from '~/model/workspace'

export class WorkspaceRequest extends Schema.TaggedRequest<WorkspaceRequest>()(
  'WorkspaceRequest',
  {
    failure: Schema.Never,
    success: Schema.Union(
      Schema.Null,
      Schema.Struct({
        workspace: Workspace,
        authors: Schema.Array(User),
      }),
    ),
    payload: {
      workspaceSlug: Schema.NonEmptyTrimmedString,
    },
  },
) {}
