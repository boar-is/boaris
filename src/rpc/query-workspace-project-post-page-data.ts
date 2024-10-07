import type { JSONContent } from '@tiptap/react'
import { Array, Option } from 'effect'
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
      primary: {}
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
}): Promise<WorkspaceProjectPostPageData | null> =>
  Option.gen(function* () {
    const workspace = yield* Array.findFirst(
      workspaceRepository,
      (it) => it.slug === workspaceSlug,
    )

    const project = yield* Array.findFirst(
      projectRepository,
      (it) => it.slug === projectSlug && it.workspaceId === workspace._id,
    )

    const post = yield* Array.findFirst(
      postRepository,
      (it) => it.slug === postSlug && it.projectId === project._id,
    )

    const revision = yield* Array.findFirst(
      revisionRepository,
      (it) => it._id === post.publishedRevisionId,
    )

    const chunks = Array.filter(
      chunkRepository,
      (it) => it.revisionId === revision._id,
    )

    return yield* 42
  }).pipe(Option.getOrNull)
