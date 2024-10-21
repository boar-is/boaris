import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Revision } from '~/model/revision'

export const [RevisionAtomContext, useRevisionAtom] = createStrictContext<
  Atom<typeof Revision.Type>
>({
  name: 'RevisionAtomContext',
})
