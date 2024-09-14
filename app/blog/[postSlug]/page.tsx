import { notFound } from 'next/navigation'
import { diffpatcher } from '~/lib/diffpatcher'
import { postDocs } from '~/lib/model/docs/posts'
import {
  type RevisionDoc,
  type RevisionValue,
  revisionDocs,
} from '~/lib/model/docs/revisions'
import { BlogPostPlayer } from './page.client'

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

  const revisionValue = await getRevisionValue(post.publishedRevisionId)

  if (!revisionValue) {
    throw new Error(`Could not retrieve revision value for post "${postSlug}"`)
  }

  return (
    <main>
      <BlogPostPlayer layout={revisionValue.layout} />
    </main>
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
