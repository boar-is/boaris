import type { JSONContent } from '@tiptap/react'
import { RevisionAssetRepository } from '~/lib/db/revision-assets'
import { AssetRepository } from '../db/assets'
import { type PostDoc, PostRepository } from '../db/posts'

export type BlogPostVm = {
  title: string
  lead: string
  captions: JSONContent
}

export class PostService {
  static getBlogPost(slug: PostDoc['slug']) {
    const post = PostRepository.findOneBySlug(slug)

    if (!post?.publishedRevisionId) {
      return null
    }

    const assets = AssetRepository.findMany(
      RevisionAssetRepository.findByRevisionId(post?.publishedRevisionId).map(
        (it) => it.assetId,
      ),
    )

    const captions = assets.find((it) => it.type === 'Captions')

    if (!captions) {
      throw new Error(
        `Post ${post.slug} does not have captions asset for the scrolling mode.`,
      )
    }

    return {
      title: post.title,
      lead: post.lead ?? post.description,
      captions: captions.doc,
    } satisfies BlogPostVm
  }
}
