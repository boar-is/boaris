import type * as O from 'effect/Option'
import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Captions } from '~/model/captions'

export const [CaptionsAtomContext, useCaptionsAtom] = createStrictContext<
  Atom<O.Option<typeof Captions.Type>>
>({
  name: 'CaptionsAtomContext',
})
