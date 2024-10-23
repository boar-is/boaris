import { query } from '~/convex/_generated/server'
import type { WorkspaceSlugsRequest } from '~/rpc/workspace-slugs-request'

const workspaceSlugs = query({
  handler: async ({
    db,
  }): Promise<(typeof WorkspaceSlugsRequest)['success']['Encoded']> => {
    const workspaces = await db.query('workspaces').order('desc').take(100)
    return workspaces.map((it) => ({ workspaceSlug: it.slug }))
  },
})

export default workspaceSlugs
