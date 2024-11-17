'use client'

import { type Atom, atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useConstant } from '~/lib/react/use-constant'
import type { Post } from '~/model2/post'
import { PostScrolling } from './_/post-scrolling'

export type PostVm = Post

export const [PostVmAtomContext, usePostVmAtom] = createStrictContext<
  Atom<PostVm>
>({
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
