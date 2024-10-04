import { notFound } from 'next/navigation'
import { diffpatcher } from '~/src/lib/diffpatcher'
import { ensureNonNull } from '~/src/lib/utils/ensure'
import { queryWorkspaceProjectPostPageData } from '~/src/rpc/query-workspace-project-post-page-data'
import {
  type WorkspaceProjectPostPageParams,
  queryWorkspaceProjectPostPageStaticParams,
} from '~/src/rpc/query-workspace-project-post-page-params'
import { currentWorkspaceSlug } from '~/src/shared/constants'
import { BlogPostClient } from './page.client'

export async function generateStaticParams() {
  return queryWorkspaceProjectPostPageStaticParams()
}

export default async function WorkspaceProjectPostPage({
  params: { workspaceSlug = currentWorkspaceSlug, projectSlug, postSlug },
}: { params: WorkspaceProjectPostPageParams }) {
  const data = await queryWorkspaceProjectPostPageData({
    workspaceSlug,
    projectSlug,
    postSlug,
  })

  if (!data) {
    notFound()
  }

  const { post } = data

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
        post={post}
        captions={revisionValue.captions}
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
