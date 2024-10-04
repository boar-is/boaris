import { Array, HashSet, pipe } from 'effect'
import { postRepository } from '~/src/domain/posts/post'
import { projectRepository } from '~/src/domain/projects/project'
import { workspaceRepository } from '~/src/domain/workspaces/workspace'
import { ensureDefined } from '~/src/lib/utils/ensure'

export type WorkspaceProjectPostPageParams = {
  readonly workspaceSlug: string
  readonly projectSlug: string
  readonly postSlug: string
}

export const queryWorkspaceProjectPostPageStaticParams = async (): Promise<
  ReadonlyArray<WorkspaceProjectPostPageParams>
> => {
  const latestPublishedPosts = pipe(
    postRepository,
    Array.filter((it) => it.publishedRevisionId !== null),
    Array.takeRight(999),
  )

  const projectIdsSet = pipe(
    latestPublishedPosts,
    Array.map((it) => it.projectId),
    HashSet.fromIterable,
  )

  const projects = pipe(
    projectRepository,
    Array.filter((it) => HashSet.has(it._id)(projectIdsSet)),
  )

  const projectsGroupedById = pipe(
    projects,
    Array.groupBy((it) => it._id),
  )

  const workspaceIdsSet = pipe(
    projects,
    Array.map((it) => it.workspaceId),
    HashSet.fromIterable,
  )

  const workspaces = pipe(
    workspaceRepository,
    Array.filter((it) => HashSet.has(it._id)(workspaceIdsSet)),
  )

  const workspacesGroupedById = pipe(
    workspaces,
    Array.groupBy((it) => it._id),
  )

  return pipe(
    latestPublishedPosts,
    Array.map((it) => {
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
    }),
  )
}
