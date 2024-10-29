import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Asset } from '~/model/asset'

export const [AssetsAtomContext, useAssetsAtom] = createStrictContext<
  Atom<ReadonlyArray<typeof Asset.Type>>
>({
  name: 'AssetsAtomContext',
})
