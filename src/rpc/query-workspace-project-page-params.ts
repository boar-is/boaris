import { Array, pipe } from 'effect'
import { workspaceRepository } from '~/src/domain/workspaces/workspace'
import { projectRepository } from '../domain/projects/project'

export type WorkspaceProjectPageParams = {
  readonly workspaceSlug: string
  readonly projectSlug: string
}

export const queryWorkspaceProjectPageParams = async (): Promise<
  ReadonlyArray<WorkspaceProjectPageParams>
> => {
  const latestProjects = pipe(projectRepository, Array.takeRight(999))

  const workspaceIdsSet = new Set(latestProjects.map((it) => it.workspaceId))
  const workspaces = workspaceRepository.filter((it) =>
    workspaceIdsSet.has(it._id),
  )
  const workspacesGroupedById = Array.groupBy(workspaces, (it) => it._id)

  return []
}
