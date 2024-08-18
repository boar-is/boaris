import type { JSONContent } from '@tiptap/react'
import { assetDocs } from '~/lib/db/assets'
import { type PostDoc, postDocs } from '~/lib/db/posts'
import { revisionAssetDocs } from '~/lib/db/revision-assets'

export type BlogPostVm = {
  title: string
  lead: string
  captions: JSONContent
}

export const getBlogPost = async (slug: PostDoc['slug']) => {
  const post = postDocs.find((it) => it.slug === slug)

  if (!post?.publishedRevisionId) {
    return null
  }

  const revisionAssetIds = revisionAssetDocs
    .filter((it) => it.assetId === post.publishedRevisionId)
    .map((it) => it.assetId)

  const assets = assetDocs.filter((it) => revisionAssetIds.includes(it._id))

  const captions = assets.find((it) => it.type === 'Captions')

  if (!captions) {
    throw new Error(
      `Post ${post.slug} does not have captions asset for the scrolling mode.`,
    )
  }

  return {
    title: post.title,
    lead: post.lead ?? post.description,
    captions: captions.content,
  } satisfies BlogPostVm
}
