import { query } from '~/convex/_generated/server'

export type ProjectParamsQueryResult = ReadonlyArray<{
  readonly workspaceSlug: string
  readonly projectSlug: string
}>

const projectParams = query({
  handler: async ({ db }): Promise<ProjectParamsQueryResult> => {
    const projects = await db.query('projects').order('desc').take(100)

    const workspaces = await Promise.all(
      projects.map((it) => db.get(it.workspaceId)),
    )

    return projects.map((project, index) => ({
      workspaceSlug: workspaces[index]!.slug,
      projectSlug: project.slug,
    }))
  },
})

export default projectParams
