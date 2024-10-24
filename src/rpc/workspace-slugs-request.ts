import { Schema } from 'effect'

export class WorkspaceSlugsRequest extends Schema.TaggedRequest<WorkspaceSlugsRequest>()(
  'WorkspaceSlugsRequest',
  {
    failure: Schema.Never,
    success: Schema.Array(
      Schema.Struct({
        workspaceSlug: Schema.NonEmptyTrimmedString,
      }),
    ),
    payload: {},
  },
) {}
