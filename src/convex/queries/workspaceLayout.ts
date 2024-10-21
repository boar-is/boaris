import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/convex/utils/getUrlProps'
import { Workspace } from '~/model/workspace'

export class WorkspaceLayoutQueryResult extends S.Class<WorkspaceLayoutQueryResult>(
  'WorkspaceLayoutQueryResult',
)({
  workspace: Workspace,
}) {}

const workspaceLayout = query({
  args: { workspaceSlug: v.string() },
  handler: async (
    { db, storage },
    { workspaceSlug },
  ): Promise<typeof WorkspaceLayoutQueryResult.Encoded | null> => {
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
