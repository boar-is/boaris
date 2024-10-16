import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'

export type WorkspacePageQueryResult = {
  workspace: {
    name: string
  }
} | null

const workspacePage = query({
  args: { workspaceSlug: v.string() },
  handler: async (
    { db },
    { workspaceSlug },
  ): Promise<WorkspacePageQueryResult> => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    return {
      workspace: {
        name: workspace.name,
      },
    }
  },
})

export default workspacePage
