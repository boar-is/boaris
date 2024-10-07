import { postAuthorRepository } from '~/src/repositories/post-author-repository'
import { postRepository } from '~/src/repositories/post-repository'
import { postTagRepository } from '~/src/repositories/post-tag-repository'
import { projectRepository } from '~/src/repositories/project-repository'
import { storageRepository } from '~/src/repositories/storage-repository'
import { tagRepository } from '~/src/repositories/tag-repository'
import { userRepository } from '~/src/repositories/user-repository'
import { workspaceRepository } from '~/src/repositories/workspace-repository'
import { forceGroupBy } from '~/src/shared/force-group-by'

export const queryWorkspaceProjectPageData = async ({
  workspaceSlug,
  projectSlug,
}: {
  workspaceSlug: string
  projectSlug: string
}) => {
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

  const posts = postRepository.filter(
    (it) => it.projectId === project._id && it.publishedRevisionId !== null,
  )
  const postIdsSet = new Set(posts.map((it) => it._id))

  const [postTags, postAuthors] = await Promise.all([
    postTagRepository.filter((it) => postIdsSet.has(it.postId)),
    postAuthorRepository.filter((it) => postIdsSet.has(it.postId)),
  ])

  const postTagIdsSet = new Set(postTags.map((it) => it.tagId))
  const postAuthorsIdsSet = new Set(postAuthors.map((it) => it.authorId))

  const [tags, users] = await Promise.all([
    tagRepository.filter((it) => postTagIdsSet.has(it._id)),
    userRepository.filter((it) => postAuthorsIdsSet.has(it._id)),
  ])

  const thumbnailIds = posts.map((it) => it.thumbnailId)
  const avatarIds = users.map((it) => it.avatarId)

  const storageMap = await storageRepository.getStorageMap([
    ...thumbnailIds,
    ...avatarIds,
  ])

  return {
    workspace,
    project,
    posts,
    postTags,
    postAuthors,
    tags: forceGroupBy(tags, (it) => it._id),
    users: forceGroupBy(tags, (it) => it._id),
    storageMap,
  }
}
