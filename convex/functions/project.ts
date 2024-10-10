import { getAllOrThrow } from 'convex-helpers/server/relationships'
import { query } from '~/convex/_generated/server'
import { ensureDefined } from '~/src/lib/utils/ensure'

export const params = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query('projects').order('desc').take(100)
    const workspaces = await getAllOrThrow(
      ctx.db,
      projects.map((it) => it.workspaceId),
    )

    return projects.map((project, index) => ({
      workspaceSlug: ensureDefined(workspaces[index]).slug,
      projectSlug: project.slug,
    }))
  },
})
