'use client'

import { atom } from 'jotai'
import { createAtomContext } from '~/lib/jotai/create-atom-context'
import { useConstant } from '~/lib/react/use-constant'
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
    <PostVmAtomContext.Provider value={useConstant(() => atom(post))}>
      <PostScrolling />
    </PostVmAtomContext.Provider>
  )
}
