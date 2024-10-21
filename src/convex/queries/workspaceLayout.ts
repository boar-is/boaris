import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { Workspace } from '~/convex/data/workspace'
import { getUrlProps } from '~/convex/utils/propsWithGetUrl'

export type WorkspaceLayoutQueryResult = {
  readonly workspace: typeof Workspace.Encoded
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

    return {
      workspace: await Workspace.encodedFromEntity(
        workspace,
        getUrlProps(storage),
      ),
    }
  },
})
export default workspaceLayout
