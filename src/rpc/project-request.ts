import { Schema } from 'effect'
import { Project } from '~/model/project'
import { Revision } from '~/model/revision'
import { Tag } from '~/model/tag'
import { User } from '~/model/user'

export class ProjectRequest extends Schema.TaggedRequest<ProjectRequest>()(
  'ProjectRequest',
  {
    failure: Schema.Never,
    success: Schema.Union(
      Schema.Null,
      Schema.Struct({
        project: Project,
        posts: Schema.Array(
          Schema.Struct({
            revision: Revision,
            tags: Schema.Array(Tag),
            authors: Schema.Array(User),
          }),
        ),
      }),
    ),
    payload: {
      workspaceSlug: Schema.NonEmptyTrimmedString,
      projectSlug: Schema.NonEmptyTrimmedString,
    },
  },
) {}
