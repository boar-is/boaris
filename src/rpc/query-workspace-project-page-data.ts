import { timestampToDate } from '~/src/lib/date'
import { postAuthorRepository } from '~/src/repositories/post-author-repository'
import { postRepository } from '~/src/repositories/post-repository'
import { postTagRepository } from '~/src/repositories/post-tag-repository'
import { projectRepository } from '~/src/repositories/project-repository'
import { storageFileRepository } from '~/src/repositories/storage-file-repository'
import { tagRepository } from '~/src/repositories/tag-repository'
import { userRepository } from '~/src/repositories/user-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspaceProjectPostData = {
  project: {
    name: string
    posts: Array<{
      title: string
      lead: string | null
      slug: string
      date: string
      thumbnailSrc: string | null
      tags: Array<{
        name: string
        slug: string
      }>
      authors: Array<{
        name: string
        slug: string
        avatarSrc: string | null
      }>
    }>
  }
}

export const queryWorkspaceProjectPageData = async ({
  workspaceSlug,
  projectSlug,
}: {
  workspaceSlug: string
  projectSlug: string
}): Promise<WorkspaceProjectPostData | null> => {
  const workspace = workspaceRepository.find((it) => it.slug === workspaceSlug)

  if (!workspace) {
    return null
  }

  const project = projectRepository.find(
    (it) => it.workspaceId === workspace._id && it.slug === projectSlug,
  )

  if (!project) {
    return null
  }

  return {
    project: {
      name: project.name,
      posts: await getPosts(project),
    },
  }
}

const getPosts = async (project: (typeof projectRepository)[number]) => {
  const publishedProjectPosts = postRepository.filter(
    (it) => it.projectId === project._id && it.publishedRevisionId,
  )

  return Promise.all(publishedProjectPosts.map((it) => getPost(it)))
}

const getPost = async (post: (typeof postRepository)[number]) => {
  const [thumbnailSrc, tags, authors] = await Promise.all([
    getPostThumbnailSrc(post),
    getTags(post),
    getAuthors(post),
  ])

  return {
    title: post.title,
    lead: post.lead ?? post.description,
    slug: post.slug,
    date: timestampToDate(post._creationTime),
    thumbnailSrc,
    tags,
    authors,
  }
}

const getPostThumbnailSrc = async (post: (typeof postRepository)[number]) =>
  storageFileRepository.find((it) => it._id === post.thumbnailId)?.src ?? null

const getTags = async (post: (typeof postRepository)[number]) => {
  const postPostTagsTagIds = postTagRepository
    .filter((it) => it.postId === post._id)
    .map((it) => it.tagId)

  const postTags = tagRepository.filter((it) =>
    postPostTagsTagIds.includes(it._id),
  )

  return postTags.map((it) => ({
    name: it.name,
    slug: it.slug,
  }))
}

const getAuthors = async (post: (typeof postRepository)[number]) => {
  const postPostAuthorsAuthorIds = postAuthorRepository
    .filter((it) => it.postId === post._id)
    .map((it) => it.authorId)

  const postUsers = userRepository.filter((it) =>
    postPostAuthorsAuthorIds.includes(it._id),
  )

  return Promise.all(postUsers.map((it) => getAuthor(it)))
}

const getAuthor = async (user: (typeof userRepository)[number]) => {
  const avatarSrc =
    storageFileRepository.find((it) => it._id === user.avatarId)?.src ?? null

  return {
    name: user.name,
    slug: user.slug,
    avatarSrc,
  }
}
