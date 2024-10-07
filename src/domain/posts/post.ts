import type { Project } from '~/src/domain/projects/project'
import type { Revision } from '~/src/domain/revisions/revision'
import type { StorageFile } from '~/src/domain/storage/storage-file'
import type { Entity } from '~/src/shared/entity'

export type Post = Entity & {
  readonly title: string
  readonly lead: string | null
  readonly description: string
  readonly slug: string
  readonly thumbnailId: StorageFile['_id'] | null
  readonly projectId: Project['_id']
  readonly draftRevisionId: Revision['_id'] | null
  readonly publishedRevisionId: Revision['_id'] | null
  readonly revisionsStorageIds: ReadonlyArray<StorageFile['_id']>
}

export const postRepository: ReadonlyArray<Post> = [
  {
    _id: 'oclcmSQoOSCF',
    _creationTime: Date.now(),
    title: 'Snappy UI Optimization with useDeferredValue',
    lead: null,
    slug: 'use-deferred-value',
    description:
      'useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I’ll show you how! ⚡',
    thumbnailId: 'az9dKDemcJxE',
    projectId: 'vyLFpVmXUmx4',
    draftRevisionId: 'CazXWqJz7tmF',
    publishedRevisionId: 'CazXWqJz7tmF',
    revisionsStorageIds: ['az9dKDemcJxE', 'ZxfWHzsajN9w', 'zNCYjhOo5NPl'],
  },
]
