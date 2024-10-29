import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Captions } from '~/model/captions'

export const [CaptionsAtomContext, useCaptionsAtom] = createStrictContext<
  Atom<typeof Captions.Type>
>({
  name: 'CaptionsAtomContext',
})
