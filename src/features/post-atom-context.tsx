import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Post } from '~/model/post'

export const [PostAtomContext, usePostAtom] = createStrictContext<
  Atom<typeof Post.Type>
>({
  name: 'PostAtomContext',
})
