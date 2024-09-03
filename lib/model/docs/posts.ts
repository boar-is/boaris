import type { Doc } from '~/lib/model/docs/_shared'
import type { ProjectDoc } from './projects'
import type { RevisionDoc } from './revisions'
import type { StorageDoc } from './storages'

export type PostDoc = Doc & {
  title: string
  lead?: string | undefined
  description: string
  slug: string
  thumbnailId?: StorageDoc['_id'] | undefined
  projectId: ProjectDoc['_id']
  draftRevisionId?: RevisionDoc['_id'] | undefined
  publishedRevisionId?: RevisionDoc['_id'] | undefined
  revisionsStorageIds: Array<StorageDoc['_id']>
}

export const postDocs: ReadonlyArray<PostDoc> = [
  {
    _id: '1',
    _creationTime: Date.now(),
    title: 'Snappy UI Optimization with useDeferredValue\n',
    slug: 'use-deferred-value',
    description:
      'useDeferredValue is one of the most underrated React hooks. It allows us to dramatically improve the performance of our applications in certain contexts. I recently used it to solve a gnarly performance problem on this blog, and in this tutorial, I’ll show you how! ⚡',
    thumbnailId: '3',
    projectId: '1',
    draftRevisionId: '1',
    publishedRevisionId: '1',
    revisionsStorageIds: ['3', '4', '5'],
  },
]
