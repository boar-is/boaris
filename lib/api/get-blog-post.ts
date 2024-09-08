import { diffpatcher } from '~/lib/diffpatcher'
import { type PostDoc, postDocs } from '~/lib/model/docs/posts'
import type { CaptionsValue } from '~/lib/model/revision/captions'
import type { Layout } from '~/lib/model/revision/layout'
import {
  type RevisionDoc,
  type RevisionValue,
  revisionDocs,
} from '../model/docs/revisions'
import { storageDocs } from '../model/docs/storages'

export type BlogPostVm = {
  title: string
  lead: string
  thumbnailSrc?: string | undefined
  date: string
  captions: CaptionsValue
  layout: Pick<Layout, 'primary'> & {}
}

export const getBlogPost = async (slug: PostDoc['slug'], locale?: string) => {
  const post = postDocs.find((it) => it.slug === slug)

  if (!post?.publishedRevisionId) {
    return null
  }

  const revisionValue = await getRevisionValue(post.publishedRevisionId)

  if (!revisionValue) {
    return null
  }

  return {
    title: post.title,
    lead: post.lead ?? post.description,
    thumbnailSrc: storageDocs.find((it) => it._id === post.thumbnailId)?.src,
    date: new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(post._creationTime)),
    captions: {},
  } satisfies BlogPostVm
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
