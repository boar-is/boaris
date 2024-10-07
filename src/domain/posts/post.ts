import type { Id } from '~/src/shared/id'

export type Post = {
  _id: Id
  _creationTime: number
  title: string
  lead: string | null
  description: string
  slug: string
  thumbnailId: Id | null
  projectId: Id
  draftRevisionId: Id | null
  publishedRevisionId: Id | null
  revisionsStorageIds: Array<Id>
}

export const postRepository: Array<Post> = [
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
