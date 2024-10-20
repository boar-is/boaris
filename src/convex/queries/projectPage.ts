import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import type { Post } from '~/convex/data/post'
import type { Project } from '~/convex/data/project'
import type { Tag } from '~/convex/data/tag'
import type { User } from '~/convex/data/user'
import { readableFromTimestamp } from '~/lib/utils/readable-from-timestamp'

export type ProjectPageQueryResult = {
  readonly project: typeof Project.Encoded
  readonly posts: ReadonlyArray<typeof Post.Encoded>
  readonly tagsByPostId: Record<string, typeof Tag.Encoded>
  readonly authorsByPostId: Record<string, typeof User.Encoded>
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

    const posts = await Promise.all(
      latestPosts.map(async (post) => {
        const [postTags, postAuthors] = await Promise.all([
          db
            .query('postTags')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
          db
            .query('postAuthors')
            .withIndex('by_postId', (q) => q.eq('postId', post._id))
            .collect(),
        ])

        const [tags, authors, thumbnailUrl] = await Promise.all([
          Promise.all(postTags.map((it) => db.get(it.tagId).then((it) => it!))),
          Promise.all(
            postAuthors.map((it) => db.get(it.authorId).then((it) => it!)),
          ),
          post.thumbnailId && storage.getUrl(post.thumbnailId),
        ])

        return {
          slug: post.slug,
          title: post.title,
          lead: post.lead,
          description: post.description,
          thumbnailUrl: thumbnailUrl ?? undefined,
          date: readableFromTimestamp(post._creationTime),
          tags: tags.map((it) => ({
            slug: it.slug,
            name: it.name,
          })),
          authors: authors.map((it) => ({
            slug: it.slug,
            name: it.name,
            avatarUrl: it.avatarUrl,
          })),
        }
      }),
    )

    return {
      project: {
        name: project.name,
        slug: project.slug,
      },
      posts,
    }
  },
})

export default projectPage
