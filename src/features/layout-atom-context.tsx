import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Layout } from '~/model/layout'

export const [LayoutAtomContext, useLayoutAtom] = createStrictContext<
  Atom<typeof Layout.Type>
>({
  name: 'LayoutAtomContext',
})
