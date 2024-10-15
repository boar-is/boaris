import { query } from '~/convex/_generated/server'

export type WorkspaceParamsQueryResult = Array<{
  workspaceSlug: string
}>

const workspaceParams = query({
  handler: async ({ db }): Promise<WorkspaceParamsQueryResult> => {
    const workspaces = await db.query('workspaces').order('desc').take(100)

    return workspaces.map((it) => ({ workspaceSlug: it.slug }))
  },
})

export default workspaceParams
