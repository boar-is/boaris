import { query } from '~/convex/_generated/server'
import { workspaceFields } from '~/convex/fields/workspaces'
import { getUrl } from '~/convex/utils/getUrl'

export const params = query({
  handler: async ({ db }) => {
    const workspaces = await db.query('workspaces').order('desc').take(100)

    return workspaces.map((it) => ({ workspaceSlug: it.slug }))
  },
})

export const layout = query({
  args: { workspaceSlug: workspaceFields.slug },
  handler: async ({ db, storage }, { workspaceSlug }) => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    const logoUrl = await getUrl(storage, workspace.logoId)

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

export const page = query({
  args: { workspaceSlug: workspaceFields.slug },
  handler: async ({ db }, { workspaceSlug }) => {
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
