import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/lib/convex/get-url-props'
import { Workspace } from '~/model/workspace'
import type { WorkspaceRequest } from '~/rpc/workspace-request'

const workspace = query({
  args: { workspaceSlug: v.string() },
  handler: async (
    { db, storage },
    { workspaceSlug },
  ): Promise<(typeof WorkspaceRequest)['success']['Encoded']> => {
    const workspace = await db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', workspaceSlug))
      .unique()

    if (!workspace) {
      return null
    }

    return {
      workspace: await Workspace.encodedFromEntity(getUrlProps(storage))(
        workspace,
      ),
    }
  },
})
export default workspace
