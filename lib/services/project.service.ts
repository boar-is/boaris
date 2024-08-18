import { PostAuthorRepository } from '~/lib/db/post-authors'
import { PostTagRepository } from '~/lib/db/post-tags'
import { PostRepository } from '~/lib/db/posts'
import { StorageRepository } from '~/lib/db/storages'
import { TagRepository } from '~/lib/db/tags'
import { UserRepository } from '~/lib/db/users'
import { WorkspaceService } from '~/lib/services/workspace.service'
import { ProjectRepository } from '../db/projects'
import { WorkspaceRepository } from '../db/workspaces'

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
    const workspace = WorkspaceRepository.findOneBySlug(
      WorkspaceService.mvpWorkspaceSlug,
    )

    if (!workspace) {
      return null
    }

    const project = ProjectRepository.findOneByWorkspaceAndSlug(
      workspace._id,
      ProjectService.mvpProjectSlug,
    )

    if (!project) {
      return null
    }

    return {
      name: project.name,
      posts: PostRepository.findPublishedByProjectId(project._id).map(
        (post) => {
          return {
            title: post.title,
            lead: post.lead ?? post.description,
            slug: post.slug,
            date: new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }).format(new Date(post._creationTime)),
            thumbnailSrc:
              post.thumbnailId &&
              StorageRepository.findOneSrc(post.thumbnailId),
            tags: TagRepository.findMany(
              PostTagRepository.findByPostId(post._id).map((it) => it._id),
            ).map((it) => ({ name: it.name, slug: it.slug })),
            authors: UserRepository.findMany(
              PostAuthorRepository.findByPostId(post._id).map((it) => it._id),
            ).map((author) => ({
              name: author.name,
              avatarSrc:
                author.avatarId &&
                StorageRepository.findOneSrc(author.avatarId),
              slug: author.slug,
            })),
          }
        },
      ),
    } satisfies BlogVm
  }
}
