import type { Doc } from '~/lib/db/_shared'
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
}

export const postDocs: ReadonlyArray<PostDoc> = [
  {
    _id: '1',
    title: 'Promises From The Ground Up',
    slug: 'promises',
    description:
      'The “Promises” API is a surprisingly tricky part of modern JavaScript. Without the right context, it doesn’t make much sense at all! In this tutorial, you’ll build an intuition for how Promises work by getting a deeper understanding of JavaScript and its limitations.',
    thumbnailId: '3',
    projectId: '1',
    draftRevisionId: '1',
    publishedRevisionId: '1',
    _creationTime: Date.now(),
  },
]
