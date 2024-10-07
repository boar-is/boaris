import type { JSONContent } from '@tiptap/react'
import { Array, Option } from 'effect'
import { chunkRepository } from '~/src/repositories/chunk.repository'
import { postRepository } from '~/src/repositories/post-repository'
import { projectRepository } from '~/src/repositories/projectRepository'
import { revisionRepository } from '~/src/repositories/revision-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'
import type { Interpolation } from '~/src/shared/interpolation'

export type WorkspaceProjectPostPageData = {
  readonly post: {
    readonly title: string
    readonly lead: string | null
    readonly description: string
    readonly thumbnailSrc: string | null
    readonly authors: ReadonlyArray<{
      readonly name: string
      readonly slug: string
      readonly avatarSrc: string | null
    }>
    readonly tags: ReadonlyArray<{
      readonly name: string
      readonly slug: string
    }>
    readonly captions: {
      readonly value: JSONContent
      readonly interpolation: Interpolation | null
    }
    readonly layouts: {
      readonly primary: {}
      readonly overrides: {}
    }
  }
}

export const queryWorkspaceProjectPostPageData = async ({
  workspaceSlug,
  projectSlug,
  postSlug,
}: {
  readonly workspaceSlug: string
  readonly projectSlug: string
  readonly postSlug: string
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
