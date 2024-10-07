import { Array, HashSet, pipe } from 'effect'
import { ensureDefined } from '~/src/lib/utils/ensure'

import { projectRepository } from '~/src/repositories/projectRepository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspaceProjectPageParams = {
  readonly workspaceSlug: string
  readonly projectSlug: string
}

export const queryWorkspaceProjectPageParams = async (): Promise<
  ReadonlyArray<WorkspaceProjectPageParams>
> => {
  const latestProjects = pipe(projectRepository, Array.takeRight(999))

  const workspaceIdsSet = pipe(
    latestProjects,
    Array.map((it) => it.workspaceId),
    HashSet.fromIterable,
  )

  const workspacesGroupedById = pipe(
    workspaceRepository,
    Array.filter((it) => HashSet.has(it._id)(workspaceIdsSet)),
    Array.groupBy((it) => it._id),
  )

  return pipe(
    latestProjects,
    Array.map((project) => {
      const workspace = ensureDefined(
        workspacesGroupedById[project.workspaceId]?.[0],
      )

      return {
        workspaceSlug: workspace.slug,
        projectSlug: project.slug,
      }
    }),
  )
}
