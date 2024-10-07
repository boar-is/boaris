import type { JSONContent } from '@tiptap/react'
import { chunkRepository } from '~/src/repositories/chunk-repository'
import { postRepository } from '~/src/repositories/post-repository'
import { projectRepository } from '~/src/repositories/project-repository'
import { revisionRepository } from '~/src/repositories/revision-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'
import type { Interpolation } from '~/src/shared/interpolation'

export type WorkspaceProjectPostPageData = {
  post: {
    title: string
    lead: string | null
    description: string
    thumbnailSrc: string | null
    authors: Array<{
      name: string
      slug: string
      avatarSrc: string | null
    }>
    tags: Array<{
      name: string
      slug: string
    }>
    captions: {
      value: JSONContent
      interpolation: Interpolation | null
    }
    layouts: {
      primary: {
        modes: Array<'static' | 'scrolling' | 'watching' | 'sliding'>
        changes: Array<{
          at: number
          value: true | null
        }>
      }
      overrides: {}
    }
  }
}

export const queryWorkspaceProjectPostPageData = async ({
  workspaceSlug,
  projectSlug,
  postSlug,
}: {
  workspaceSlug: string
  projectSlug: string
  postSlug: string
}): Promise<WorkspaceProjectPostPageData | null> => {
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
