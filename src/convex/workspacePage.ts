import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { query } from '~/convex/_generated/server'
import { getUrlProps } from '~/lib/convex/get-url-props'
import { Workspace } from '~/model/workspace'

export class WorkspacePageQueryResult extends S.Class<WorkspacePageQueryResult>(
  'WorkspacePageQueryResult',
)({
  workspace: Workspace,
}) {}

const workspacePage = query({
  args: { workspaceSlug: v.string() },
  handler: async (
    { db, storage },
    { workspaceSlug },
  ): Promise<typeof WorkspacePageQueryResult.Encoded | null> => {
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

export default workspacePage
