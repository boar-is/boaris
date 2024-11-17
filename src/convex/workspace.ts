import { Schema } from 'effect'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/lib/convex/get-url-props'
import { Workspace } from '~/model/workspace'
import { WorkspaceRequest } from '~/rpc/workspace-request'

const workspace = query({
  handler: async (
    { db, storage },
    args: { workspaceSlug: string },
  ): Promise<(typeof WorkspaceRequest)['success']['Encoded']> => {
    const { workspaceSlug } = Schema.decodeUnknownSync(WorkspaceRequest)(args)
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
      authors: [],
    }
  },
})
export default workspace
