import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { ensurePresent } from '~/src/lib/utils/ensure'

export const params = query({
  handler: async ({ db }) => {
    const projects = await db.query('projects').order('desc').take(100)

    const workspaces = await Promise.all(
      projects.map(async (it) => db.get(it.workspaceId)),
    )

    return projects.map((project, index) => ({
      workspaceSlug: ensurePresent(workspaces[index]).slug,
      projectSlug: project.slug,
    }))
  },
})

export const page = query({
  args: { workspaceSlug: v.string(), projectSlug: v.string() },
  handler: async ({ db, storage }, { workspaceSlug, projectSlug }) => {
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

    const posts = await db
      .query('posts')
      .withIndex('by_projectId_slug', (q) => q.eq('projectId', project._id))
      .filter((q) => q.not(q.eq('publishedRevisionId', undefined)))
      .order('desc')
      .take(25)

    const asd = await db.query('postTags').withIndex('by_postId', q => q.)
  },
})
