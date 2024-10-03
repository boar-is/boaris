import { type Post, postRepository } from '~/src/domain/posts/post'
import { postAuthorRepository } from '~/src/domain/posts/post-author'
import { postTagRepository } from '~/src/domain/posts/post-tag'
import { tagRepository } from '~/src/domain/posts/tag'
import { type Project, projectRepository } from '~/src/domain/projects/project'
import { storageFileRepository } from '~/src/domain/storage/storage-file'
import { type User, userRepository } from '~/src/domain/users/user'
import { workspaceRepository } from '~/src/domain/workspaces/workspace'
import { timestampToDate } from '~/src/lib/date'

export type BlogProjectVm = {
  readonly name: string
  readonly posts: ReadonlyArray<BlogProjectPostVm>
}

export type BlogProjectPostVm = {
  readonly title: string
  readonly lead: string
  readonly slug: string
  readonly date: string
  readonly thumbnailSrc: string | null
  readonly tags: ReadonlyArray<BlogProjectPostTagVm>
  readonly authors: ReadonlyArray<BlogProjectPostAuthorVm>
}

export type BlogProjectPostTagVm = {
  name: string
  slug: string
}

export type BlogProjectPostAuthorVm = {
  name: string
  slug: string
  avatarSrc: string | null
}

export const queryBlogProject = async (
  workspaceSlug: string,
  projectSlug: string,
): Promise<BlogProjectVm | null> => {
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
    name: project.name,
    posts: await getPosts(project),
  }
}

const getPosts = async (project: Project) => {
  const publishedProjectPosts = postRepository.filter(
    (it) => it.projectId === project._id && it.publishedRevisionId,
  )

  return Promise.all(publishedProjectPosts.map((it) => getPost(it)))
}

const getPost = async (post: Post): Promise<BlogProjectPostVm> => {
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

const getPostThumbnailSrc = async (post: Post) => {
  return (
    storageFileRepository.find((it) => it._id === post.thumbnailId)?.src ?? null
  )
}

const getTags = async (
  post: Post,
): Promise<ReadonlyArray<BlogProjectPostTagVm>> => {
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

const getAuthors = async (
  post: Post,
): Promise<ReadonlyArray<BlogProjectPostAuthorVm>> => {
  const postPostAuthorsAuthorIds = postAuthorRepository
    .filter((it) => it.postId === post._id)
    .map((it) => it.authorId)

  const postUsers = userRepository.filter((it) =>
    postPostAuthorsAuthorIds.includes(it._id),
  )

  return Promise.all(postUsers.map((it) => getAuthor(it)))
}

const getAuthor = async (user: User): Promise<BlogProjectPostAuthorVm> => {
  const avatarSrc =
    storageFileRepository.find((it) => it._id === user.avatarId)?.src ?? null

  return {
    name: user.name,
    slug: user.slug,
    avatarSrc,
  }
}
