import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Asset } from '~/model/asset'

export const [AssetIdAtomContext, useAssetIdAtom] = createStrictContext<
  Atom<(typeof Asset.Type)['_id']>
>({
  name: 'AssetIdAtomContext',
})
