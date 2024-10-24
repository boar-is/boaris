import type { Option } from 'effect'
import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { LayoutLayer } from '~/model/layoutLayer'

export const [LayoutLayerAtomContext, useLayoutLayerAtom] = createStrictContext<
  Atom<Option.Option<typeof LayoutLayer.Type>>
>({
  name: 'LayoutLayerAtomContext',
})
