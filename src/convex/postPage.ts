import { v } from 'convex/values'
import * as S from 'effect/Schema'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/lib/convex/get-url-props'
import { Post } from '~/model/post'
import { Revision } from '~/model/revision'
import { Tag } from '~/model/tag'
import { toActionsByTrackId } from '~/model/trackChunk'
import { User } from '~/model/user'

export class PostPageQueryResult extends S.Class<PostPageQueryResult>(
  'PostPageQueryResult',
)({
  post: Post,
  tags: S.Array(Tag),
  authors: S.Array(User),
  revision: Revision,
}) {}

const postPage = query({
  args: {
    workspaceSlug: v.string(),
    projectSlug: v.string(),
    postSlug: v.string(),
  },
  handler: async (
    { db, storage },
    { workspaceSlug, projectSlug, postSlug },
  ): Promise<typeof PostPageQueryResult.Encoded | null> => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    const project = await db
      .query('projects')
      .withIndex('by_workspaceId_slug', (q) =>
        q.eq('workspaceId', workspace._id).eq('slug', projectSlug),
      )
      .unique()

    if (!project) {
      return project
    }

    const postEntity = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) =>
        q.eq('projectId', project._id).eq('slug', postSlug),
      )
      .unique()

    if (!postEntity?.publishedRevisionId) {
      return null
    }

    const revisionEntity = await db.get(postEntity.publishedRevisionId)

    if (!revisionEntity) {
      return null
    }

    const getUrl = getUrlProps(storage)

    const [post, postTags, postAuthors, trackChunks] = await Promise.all([
      Post.encodedFromEntity(getUrl)(postEntity),
      db
        .query('postTags')
        .withIndex('by_postId', (q) => q.eq('postId', postEntity._id))
        .collect(),
      db
        .query('postAuthors')
        .withIndex('by_postId', (q) => q.eq('postId', postEntity._id))
        .collect(),
      db
        .query('trackChunks')
        .withIndex('by_revisionId', (q) =>
          q.eq('revisionId', revisionEntity._id),
        )
        .collect(),
    ])

    const [tags, authors, revision] = await Promise.all([
      Promise.all(
        postTags.map((it) =>
          db.get(it.tagId).then((it) => Tag.encodedFromEntity(it!)),
        ),
      ),
      Promise.all(
        postAuthors.map((it) =>
          db.get(it.authorId).then((it) => User.encodedFromEntity(it!)),
        ),
      ),
      Revision.encodedFromEntity(
        revisionEntity,
        toActionsByTrackId(trackChunks),
        getUrl,
      ),
    ])

    return {
      post,
      tags,
      authors,
      revision,
    }
  },
})

export default postPage
