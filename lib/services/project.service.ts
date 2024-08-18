import { postAuthorDocs } from '~/lib/db/post-authors'
import { postTagDocs } from '~/lib/db/post-tags'
import { postDocs } from '~/lib/db/posts'
import { storageDocs } from '~/lib/db/storages'
import { tagDocs } from '~/lib/db/tags'
import { userDocs } from '~/lib/db/users'
import { WorkspaceService } from '~/lib/services/workspace.service'
import { projectDocs } from '../db/projects'
import { workspaceDocs } from '../db/workspaces'

export type BlogVm = {
  name: string
  posts: Array<{
    title: string
    lead: string
    slug: string
    date: string
    thumbnailSrc?: string | undefined
    tags: Array<{
      name: string
      slug: string
    }>
    authors: Array<{
      name: string
      avatarSrc?: string | undefined
      slug: string
    }>
  }>
}

export class ProjectService {
  static mvpProjectSlug = 'blog'

  static getBlog() {
    const workspace = workspaceDocs.find(
      (it) => it.slug === WorkspaceService.mvpWorkspaceSlug,
    )

    if (!workspace) {
      return null
    }

    const project = projectDocs.find(
      (it) =>
        it.workspaceId === workspace._id &&
        it.slug === ProjectService.mvpProjectSlug,
    )

    if (!project) {
      return null
    }

    return {
      name: project.name,
      posts: postDocs
        .filter((it) => it.projectId === project._id && it.publishedRevisionId)
        .map((post) => {
          const postTagIds = postTagDocs
            .filter((it) => it.postId === post._id)
            .map((it) => it._id)

          const postAuthorIds = postAuthorDocs
            .filter((it) => it.postId === post._id)
            .map((it) => it._id)

          return {
            title: post.title,
            lead: post.lead ?? post.description,
            slug: post.slug,
            date: new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }).format(new Date(post._creationTime)),
            thumbnailSrc: storageDocs.find((it) => it._id === post.thumbnailId)
              ?.src,
            tags: tagDocs
              .filter((it) => postTagIds.includes(it._id))
              .map((it) => ({ name: it.name, slug: it.slug })),
            authors: userDocs
              .filter((it) => postAuthorIds.includes(it._id))
              .map((author) => ({
                name: author.name,
                avatarSrc: storageDocs.find((it) => it._id === author.avatarId)
                  ?.src,
                slug: author.slug,
              })),
          }
        }),
    } satisfies BlogVm
  }
}
