import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { Post } from '~/convex/data/post'
import { Revision } from '~/convex/data/revision'
import { Tag } from '~/convex/data/tag'
import { User } from '~/convex/data/user'
import { getUrlProps } from '~/convex/utils/props-with-get-url'

export type PostPageQueryResult = {
  readonly post: typeof Post.Encoded
  readonly tags: ReadonlyArray<typeof Tag.Encoded>
  readonly authors: ReadonlyArray<typeof User.Encoded>
  readonly revision: typeof Revision.Encoded
} | null

const postPage = query({
  args: {
    workspaceSlug: v.string(),
    projectSlug: v.string(),
    postSlug: v.string(),
  },
  handler: async (
    { db, storage },
    { workspaceSlug, projectSlug, postSlug },
  ): Promise<PostPageQueryResult> => {
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
      Post.encodedFromEntity(postEntity, getUrl),
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
      Revision.encodedFromEntity(revisionEntity, actions, getUrl),
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
