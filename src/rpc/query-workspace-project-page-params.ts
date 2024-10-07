import { Array, pipe } from 'effect'
import { ensureDefined } from '~/src/lib/utils/ensure'

import { projectRepository } from '~/src/repositories/project-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspaceProjectPageParams = {
  workspaceSlug: string
  projectSlug: string
}

export const queryWorkspaceProjectPageParams = async (): Promise<
  Array<WorkspaceProjectPageParams>
> => {
  const latestProjects = Array.takeRight(projectRepository, 999)

  const workspaceIdsSet = new Set(latestProjects.map((it) => it.workspaceId))

  const workspacesGroupedById = pipe(
    workspaceRepository,
    Array.filter((it) => workspaceIdsSet.has(it._id)),
    Array.groupBy((it) => it._id),
  )

  return latestProjects.map((project) => {
    const workspace = ensureDefined(
      workspacesGroupedById[project.workspaceId]?.[0],
    )

    return {
      workspaceSlug: workspace.slug,
      projectSlug: project.slug,
    }
  })
}
