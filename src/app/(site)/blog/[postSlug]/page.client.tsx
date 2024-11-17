'use client'

import { createAtomContext } from '~/lib/jotai/create-atom-context'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import type { Post } from '~/model2/post'
import { PostScrolling } from './_post-scrolling'

export type PostVm = Post

export const [PostVmAtomContext, usePostVmAtom, usePostVmAtomValue] =
  createAtomContext<PostVm>({
    name: 'PostVmAtomContext',
  })

export function PostPageClient({
  post,
}: {
  post: Post
}) {
  return (
    <PostVmAtomContext.Provider value={useConstAtom(post)}>
      <PostScrolling />
    </PostVmAtomContext.Provider>
  )
}
