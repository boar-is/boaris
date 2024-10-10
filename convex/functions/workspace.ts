import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { getStorageMap } from '~/convex/utils/getStorageMap'

export const params = query({
  handler: async ({ db }) => {
    const workspaces = await db.query('workspaces').order('desc').take(100)

    return workspaces.map((it) => ({ workspaceSlug: it.slug }))
  },
})

export const layout = query({
  args: { workspaceSlug: v.string() },
  handler: async ({ db, storage }, { workspaceSlug }) => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    const storageMap = await getStorageMap(storage, workspace.logoId)

    return {
      workspace: {
        name: workspace.name,
        logoId: workspace.logoId,
        socialLinks: workspace.socialLinks.map((it) => ({
          href: it.href,
          label: it.label,
        })),
      },
      storageMap,
    }
  },
})

export const page = query({
  args: { workspaceSlug: v.string() },
  handler: async ({ db }, { workspaceSlug }) => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    return {
      workspace,
    }
  },
})
