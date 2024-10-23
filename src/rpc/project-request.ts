import * as S from 'effect/Schema'
import { Post } from '~/model/post'
import { Project } from '~/model/project'
import { Tag } from '~/model/tag'
import { User } from '~/model/user'

export class ProjectRequest extends S.TaggedRequest<ProjectRequest>()(
  'ProjectRequest',
  {
    failure: S.Never,
    success: S.Union(
      S.Null,
      S.Struct({
        project: Project,
        posts: S.Array(Post),
        tagsByPostSlug: S.HashMap({
          key: Post.fields.slug,
          value: S.Array(Tag),
        }),
        authorsByPostSlug: S.HashMap({
          key: Post.fields.slug,
          value: S.Array(User),
        }),
      }),
    ),
    payload: {
      workspaceSlug: S.NonEmptyTrimmedString,
      projectSlug: S.NonEmptyTrimmedString,
    },
  },
) {}
