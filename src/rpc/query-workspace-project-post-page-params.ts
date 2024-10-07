import { Array, HashSet, pipe } from 'effect'
import { ensureDefined } from '~/src/lib/utils/ensure'
import { postRepository } from '~/src/repositories/post-repository'
import { projectRepository } from '~/src/repositories/projectRepository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

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

  const workspacesGroupedById = pipe(
    workspaceRepository,
    Array.filter((it) => HashSet.has(it._id)(workspaceIdsSet)),
    Array.groupBy((it) => it._id),
  )

  return pipe(
    latestPublishedPosts,
    Array.map((post) => {
      const project = ensureDefined(projectsGroupedById[post.projectId]?.[0])
      const workspace = ensureDefined(
        workspacesGroupedById[project.workspaceId]?.[0],
      )

      return {
        workspaceSlug: workspace.slug,
        projectSlug: project.slug,
        postSlug: post.slug,
      }
    }),
  )
}
