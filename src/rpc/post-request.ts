import * as S from 'effect/Schema'
import { Post } from '~/model/post'
import { Revision } from '~/model/revision'
import { Tag } from '~/model/tag'
import { User } from '~/model/user'

export class PostRequest extends S.TaggedRequest<PostRequest>()('PostRequest', {
  failure: S.Never,
  success: S.Union(
    S.Null,
    S.Struct({
      post: Post,
      tags: S.Array(Tag),
      authors: S.Array(User),
      revision: Revision,
    }),
  ),
  payload: {
    workspaceSlug: S.NonEmptyTrimmedString,
    projectSlug: S.NonEmptyTrimmedString,
    postSlug: S.NonEmptyTrimmedString,
  },
}) {}
