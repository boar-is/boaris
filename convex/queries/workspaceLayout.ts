import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'

export type WorkspaceLayoutQueryResult = {
  workspace: {
    name: string
    logoUrl: string | undefined
    socialLinks: Array<{
      href: string
      label: string | undefined
    }>
  }
} | null

const workspaceLayout = query({
  args: { workspaceSlug: v.string() },
  handler: async (
    { db, storage },
    { workspaceSlug },
  ): Promise<WorkspaceLayoutQueryResult> => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    const logoUrl =
      (workspace.logoId && (await storage.getUrl(workspace.logoId))) ??
      undefined

    return {
      workspace: {
        name: workspace.name,
        logoUrl,
        socialLinks: workspace.socialLinks.map((it) => ({
          href: it.href,
          label: it.label,
        })),
      },
    }
  },
})
export default workspaceLayout
