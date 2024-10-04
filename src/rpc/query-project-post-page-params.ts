import { Array } from 'effect'
import { postRepository } from '~/src/domain/posts/post'
import { projectRepository } from '~/src/domain/projects/project'
import { workspaceRepository } from '~/src/domain/workspaces/workspace'
import { ensureDefined } from '~/src/lib/utils/ensure'

export type ProjectPostPageParams = {
  workspaceSlug: string
  projectSlug: string
  postSlug: string
}

export const queryProjectPostPageStaticParams = async (): Promise<
  ReadonlyArray<ProjectPostPageParams>
> => {
  const latestPublishedPosts = Array.takeRight(100)(
    postRepository.filter((it) => it.publishedRevisionId),
  )
  const projectIdsSet = new Set(latestPublishedPosts.map((it) => it.projectId))
  const projects = projectRepository.filter((it) => projectIdsSet.has(it._id))
  const projectsGroupedById = Array.groupBy(projects, (it) => it._id)

  const workspaceIdsSet = new Set(projects.map((it) => it.workspaceId))
  const workspaces = workspaceRepository.filter((it) =>
    workspaceIdsSet.has(it._id),
  )
  const workspacesGroupedById = Array.groupBy(workspaces, (it) => it._id)

  return latestPublishedPosts.map((it) => {
    const postSlug = it.slug

    const project = ensureDefined(projectsGroupedById[it.projectId]?.[0])
    const projectSlug = project.slug

    const workspace = ensureDefined(
      workspacesGroupedById[project.workspaceId]?.[0],
    )
    const workspaceSlug = workspace.slug

    return {
      workspaceSlug,
      projectSlug,
      postSlug,
    }
  })
}
