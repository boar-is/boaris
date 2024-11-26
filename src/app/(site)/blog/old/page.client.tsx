'use client'

import { Schema } from 'effect'
import { createAtomContext } from '~/lib/jotai/create-atom-context'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { Post } from '~/model/post'
import { PostScrolling } from './_post-scrolling'

export type PostVm = Post

export const [PostVmAtomContext, usePostVmAtom, usePostVmAtomValue] =
  createAtomContext<PostVm>({
    name: 'PostVmAtomContext',
  })

export function PostPageClient({
  post,
}: {
  post: typeof Post.Encoded
}) {
  return (
    <PostVmAtomContext.Provider
      value={useConstAtom(Schema.decodeSync(Post)(post))}
    >
      <PostScrolling />
    </PostVmAtomContext.Provider>
  )
}
