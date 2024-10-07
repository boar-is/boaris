import { ensureDefined } from '~/src/lib/utils/ensure'

import { projectRepository } from '~/src/repositories/project-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'
import { forceGroupBy } from '~/src/shared/force-group-by'

export type WorkspaceProjectPageParams = {
  workspaceSlug: string
  projectSlug: string
}

export const queryWorkspaceProjectPageParams = async () => {
  const projects = projectRepository

  const workspaceIdsSet = new Set(projects.map((it) => it.workspaceId))

  const workspacesGroupedById = forceGroupBy(
    workspaceRepository.filter((it) => workspaceIdsSet.has(it._id)),
    (it) => it._id,
  )

  return projects.map((project): WorkspaceProjectPageParams => {
    const workspace = ensureDefined(workspacesGroupedById[project.workspaceId])

    return {
      workspaceSlug: workspace.slug,
      projectSlug: project.slug,
    }
  })
}
