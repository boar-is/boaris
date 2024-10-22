import type * as O from 'effect/Option'
import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { LayoutLayer } from '~/model/layoutLayer'

export const [LayoutLayerAtomContext, useLayoutLayerAtom] = createStrictContext<
  Atom<O.Option<typeof LayoutLayer.Type>>
>({
  name: 'LayoutLayerAtomContext',
})
