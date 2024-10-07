import { chunkRepository } from '~/src/repositories/chunk-repository'
import { postRepository } from '~/src/repositories/post-repository'
import { projectRepository } from '~/src/repositories/project-repository'
import { revisionRepository } from '~/src/repositories/revision-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export const queryWorkspaceProjectPostPageData = async ({
  workspaceSlug,
  projectSlug,
  postSlug,
}: {
  workspaceSlug: string
  projectSlug: string
  postSlug: string
}) => {
  const workspace = workspaceRepository.find((it) => it.slug === workspaceSlug)

  if (!workspace) {
    return null
  }

  const project = projectRepository.find(
    (it) => it.slug === projectSlug && it.workspaceId === workspace._id,
  )

  if (!project) {
    return null
  }

  const post = postRepository.find(
    (it) => it.slug === postSlug && it.projectId === project._id,
  )

  if (!post) {
    return null
  }

  const revision = revisionRepository.find(
    (it) => it._id === post.publishedRevisionId,
  )

  if (!revision) {
    return null
  }

  const chunks = chunkRepository.filter((it) => it.revisionId === revision._id)

  return 42
}
