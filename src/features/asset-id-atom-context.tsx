import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Asset } from '~/model/asset'

// TODO Consider not using context at all
export const [AssetIdAtomContext, useAssetIdAtom] = createStrictContext<
  Atom<(typeof Asset.Type)['_id']>
>({
  name: 'AssetIdAtomContext',
})
