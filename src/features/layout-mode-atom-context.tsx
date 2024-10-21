import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { LayoutMode } from '~/model/layoutMode'

export const [LayoutModeAtomContext, useLayoutModeAtom] = createStrictContext<
  Atom<typeof LayoutMode.Type>
>({
  name: 'LayoutModeAtomContext',
})
