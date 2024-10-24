import { Schema } from 'effect'
import { Post } from '~/model/post'
import { Revision } from '~/model/revision'
import { Tag } from '~/model/tag'
import { User } from '~/model/user'

export class PostRequest extends Schema.TaggedRequest<PostRequest>()(
  'PostRequest',
  {
    failure: Schema.Never,
    success: Schema.Union(
      Schema.Null,
      Schema.Struct({
        post: Post,
        tags: Schema.Array(Tag),
        authors: Schema.Array(User),
        revision: Revision,
      }),
    ),
    payload: {
      workspaceSlug: Schema.NonEmptyTrimmedString,
      projectSlug: Schema.NonEmptyTrimmedString,
      postSlug: Schema.NonEmptyTrimmedString,
    },
  },
) {}
