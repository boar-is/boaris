import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { Post } from '~/convex/data/post'
import { Project } from '~/convex/data/project'
import { Tag } from '~/convex/data/tag'
import { User } from '~/convex/data/user'
import { getUrlProps } from '~/convex/utils/propsWithGetUrl'

export type ProjectPageQueryResult = {
  readonly project: typeof Project.Encoded
  readonly posts: ReadonlyArray<typeof Post.Encoded>
  readonly tagsByPostSlug: Record<string, Array<typeof Tag.Encoded>>
  readonly authorsByPostSlug: Record<string, Array<typeof User.Encoded>>
} | null

const projectPage = query({
  args: {
    workspaceSlug: v.string(),
    projectSlug: v.string(),
  },
  handler: async (
    { db, storage },
    { workspaceSlug, projectSlug },
  ): Promise<ProjectPageQueryResult> => {
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

    const latestPosts = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) => q.eq('projectId', project._id))
      .filter((q) => q.not(q.eq('publishedRevisionId', undefined)))
      .order('desc')
      .take(25)

    const getUrl = getUrlProps(storage)

    const [posts, tagsByPostSlugEntries, authorsByPostSlugEntries] =
      await Promise.all([
        Promise.all(
          latestPosts.map((post) => Post.encodedFromEntity(post, getUrl)),
        ),
        Promise.all(
          latestPosts.map(async (post) => {
            const postTags = await db
              .query('postTags')
              .withIndex('by_postId', (q) => q.eq('postId', post._id))
              .collect()
            return Promise.all(
              postTags.map(
                async (it) =>
                  [
                    post.slug,
                    Tag.encodedFromEntity(
                      await db.get(it.tagId).then((it) => it!),
                    ),
                  ] as const,
              ),
            )
          }),
        ),
        Promise.all(
          latestPosts.map(async (post) => {
            const postAuthors = await db
              .query('postAuthors')
              .withIndex('by_postId', (q) => q.eq('postId', post._id))
              .collect()
            return Promise.all(
              postAuthors.map(
                async (it) =>
                  [
                    post.slug,
                    User.encodedFromEntity(
                      await db.get(it.authorId).then((it) => it!),
                    ),
                  ] as const,
              ),
            )
          }),
        ),
      ])

    return {
      project: Project.encodedFromEntity(project),
      posts,
      tagsByPostSlug: Object.fromEntries(tagsByPostSlugEntries),
      authorsByPostSlug: Object.fromEntries(authorsByPostSlugEntries),
    }
  },
})

export default projectPage
