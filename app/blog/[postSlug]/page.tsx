import { notFound } from 'next/navigation'
import { diffpatcher } from '~/lib/diffpatcher'
import { postDocs } from '~/lib/model/docs/posts'
import {
  type RevisionDoc,
  type RevisionValue,
  revisionDocs,
} from '~/lib/model/docs/revisions'
import { type StorageDoc, storageDocs } from '~/lib/model/docs/storages'
import { ensureNonNull } from '~/lib/utils/ensure'
import { BlogPostClient } from './page.client'

export async function generateStaticParams() {
  return postDocs
    .filter((it) => it.publishedRevisionId)
    .map((it) => ({
      postSlug: it.slug,
    }))
}

export default async function BlogPostPage({
  params: { postSlug },
}: { params: { postSlug: string } }) {
  const post = postDocs[0]

  if (!post?.publishedRevisionId) {
    notFound()
  }

  const revisionValue = ensureNonNull(
    await getRevisionValue(post.publishedRevisionId),
    `Could not retrieve revision value for post "${postSlug}"`,
  )

  const storageMap = storageDocs.reduce(
    (acc, curr) => {
      if (post.revisionsStorageIds.includes(curr._id)) {
        acc[curr._id] = curr.src
      }
      return acc
    },
    {} as Record<StorageDoc['_id'], StorageDoc['src']>,
  )

  return (
    <div className="flex flex-col container min-h-full">
      <BlogPostClient
        tracks={revisionValue.tracks}
        layout={revisionValue.layout}
        storageMap={storageMap}
      />
    </div>
  )
}

const getRevisionValue = async (revisionId: RevisionDoc['_id']) => {
  const revision = revisionDocs.find((it) => it._id === revisionId)

  if (!revision) {
    return null
  }

  if (revision.parentId === null) {
    return revision.value
  }

  const deltaRevisions: Array<
    Extract<RevisionDoc, { parentId: RevisionDoc['_id'] }>
  > = [revision]
  let parentId: RevisionDoc['parentId'] = revision.parentId
  while (parentId !== null) {
    const parentRevision = revisionDocs.find((it) => it._id === parentId)

    if (!parentRevision) {
      throw new Error(
        `Could not find a parent revision with the provided id: ${parentId}`,
      )
    }

    if (parentRevision.parentId === null) {
      return deltaRevisions.reduceRight(
        (value, deltaRevision) =>
          diffpatcher.patch(value, deltaRevision.delta) as RevisionValue,
        parentRevision.value,
      )
    }

    deltaRevisions.push(parentRevision)
    parentId = parentRevision.parentId
  }

  throw new Error('Unreachable statement')
}
