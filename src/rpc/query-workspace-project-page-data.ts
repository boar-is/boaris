import type { Post } from '~/src/domain/posts/post'
import type { Project } from '~/src/domain/projects/project'
import type { Tag } from '~/src/domain/tags/tag'
import type { User } from '~/src/domain/users/user'
import type { Workspace } from '~/src/domain/workspaces/workspace'
import { timestampToDate } from '~/src/lib/date'
import { postAuthorRepository } from '~/src/repositories/post-author-repository'
import { postRepository } from '~/src/repositories/post-repository'
import { postTagRepository } from '~/src/repositories/post-tag-repository'
import { projectRepository } from '~/src/repositories/projectRepository'
import { storageFileRepository } from '~/src/repositories/storage-file-repository'
import { tagRepository } from '~/src/repositories/tag-repository'
import { userRepository } from '~/src/repositories/user-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'

export type WorkspaceProjectPostData = {
  readonly project: Pick<Project, 'name'> & {
    readonly posts: ReadonlyArray<
      Pick<Post, 'title' | 'lead' | 'slug'> & {
        readonly date: string
        readonly thumbnailSrc: string | null
        readonly tags: ReadonlyArray<Pick<Tag, 'name' | 'slug'>>
        readonly authors: ReadonlyArray<
          Pick<User, 'name' | 'slug'> & {
            readonly avatarSrc: string | null
          }
        >
      }
    >
  }
}

export const queryWorkspaceProjectPageData = async ({
  workspaceSlug,
  projectSlug,
}: {
  readonly workspaceSlug: Workspace['slug']
  readonly projectSlug: Project['slug']
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

const getPosts = async (project: Project) => {
  const publishedProjectPosts = postRepository.filter(
    (it) => it.projectId === project._id && it.publishedRevisionId,
  )

  return Promise.all(publishedProjectPosts.map((it) => getPost(it)))
}

const getPost = async (post: Post) => {
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

const getPostThumbnailSrc = async (post: Post) =>
  storageFileRepository.find((it) => it._id === post.thumbnailId)?.src ?? null

const getTags = async (post: Post) => {
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

const getAuthors = async (post: Post) => {
  const postPostAuthorsAuthorIds = postAuthorRepository
    .filter((it) => it.postId === post._id)
    .map((it) => it.authorId)

  const postUsers = userRepository.filter((it) =>
    postPostAuthorsAuthorIds.includes(it._id),
  )

  return Promise.all(postUsers.map((it) => getAuthor(it)))
}

const getAuthor = async (user: User) => {
  const avatarSrc =
    storageFileRepository.find((it) => it._id === user.avatarId)?.src ?? null

  return {
    name: user.name,
    slug: user.slug,
    avatarSrc,
  }
}
