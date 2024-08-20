import { postAuthorDocs } from '~/lib/model/docs/post-authors'
import { postTagDocs } from '~/lib/model/docs/post-tags'
import { postDocs } from '~/lib/model/docs/posts'
import { projectDocs } from '~/lib/model/docs/projects'
import { storageDocs } from '~/lib/model/docs/storages'
import { tagDocs } from '~/lib/model/docs/tags'
import { userDocs } from '~/lib/model/docs/users'
import { workspaceDocs } from '~/lib/model/docs/workspaces'

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

export const getBlog = async (
  workspaceSlug = 'boaris',
  projectSlug = 'blog',
) => {
  const workspace = workspaceDocs.find((it) => it.slug === workspaceSlug)

  if (!workspace) {
    return null
  }

  const project = projectDocs.find(
    (it) => it.workspaceId === workspace._id && it.slug === projectSlug,
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
