import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { ensurePresent } from '~/src/lib/utils/ensure'

export const params = query({
  handler: async ({ db }) => {
    const posts = await db.query('posts').order('desc').take(100)

    const projects = await Promise.all(posts.map((it) => db.get(it.projectId)))

    const workspaces = await Promise.all(
      projects.map((it) => it && db.get(it.workspaceId)),
    )

    return posts.map((post, index) => ({
      workspaceSlug: ensurePresent(workspaces[index]).slug,
      projectSlug: ensurePresent(projects[index]).slug,
      postSlug: post.slug,
    }))
  },
})

export const page = query({
  args: {
    workspaceSlug: v.string(),
    projectSlug: v.string(),
    postSlug: v.string(),
  },
  handler: async (
    { db, storage },
    { workspaceSlug, projectSlug, postSlug },
  ) => {
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

    const post = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) =>
        q.eq('projectId', project._id).eq('slug', postSlug),
      )
      .unique()

    if (!post?.publishedRevisionId) {
      return null
    }

    const revision = await db.get(post.publishedRevisionId)

    return {
      post: {
        _id: post._id,
      },
    }
  },
})
