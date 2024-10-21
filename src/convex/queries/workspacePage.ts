import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { Workspace } from '~/convex/data/workspace'
import { getUrlProps } from '~/convex/utils/propsWithGetUrl'

export type WorkspacePageQueryResult = {
  readonly workspace: typeof Workspace.Encoded
} | null

const workspacePage = query({
  args: { workspaceSlug: v.string() },
  handler: async (
    { db, storage },
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
      workspace: await Workspace.encodedFromEntity(
        workspace,
        getUrlProps(storage),
      ),
    }
  },
})

export default workspacePage
