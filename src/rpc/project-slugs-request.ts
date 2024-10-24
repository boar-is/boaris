import { Schema } from 'effect'

export class ProjectSlugsRequest extends Schema.TaggedRequest<ProjectSlugsRequest>()(
  'ProjectSlugsRequest',
  {
    failure: Schema.Never,
    success: Schema.Array(
      Schema.Struct({
        workspaceSlug: Schema.NonEmptyTrimmedString,
        projectSlug: Schema.NonEmptyTrimmedString,
      }),
    ),
    payload: {},
  },
) {}
