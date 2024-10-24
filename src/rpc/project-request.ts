import { Schema } from 'effect'
import { Post } from '~/model/post'
import { Project } from '~/model/project'
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
        posts: Schema.Array(Post),
        tagsByPostSlug: Schema.HashMap({
          key: Post.fields.slug,
          value: Schema.Array(Tag),
        }),
        authorsByPostSlug: Schema.HashMap({
          key: Post.fields.slug,
          value: Schema.Array(User),
        }),
      }),
    ),
    payload: {
      workspaceSlug: Schema.NonEmptyTrimmedString,
      projectSlug: Schema.NonEmptyTrimmedString,
    },
  },
) {}
