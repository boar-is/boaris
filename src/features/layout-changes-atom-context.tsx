import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { LayoutChange } from '~/model/layoutChange'

export const [LayoutChangesAtomContext, useLayoutChangesAtom] =
  createStrictContext<Atom<ReadonlyArray<typeof LayoutChange.Type>>>({
    name: 'LayoutChangesAtomContext',
  })
