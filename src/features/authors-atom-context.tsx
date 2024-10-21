import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { User } from '~/model/user'

export const [AuthorsAtomContext, useAuthorsAtom] = createStrictContext<
  Atom<ReadonlyArray<typeof User.Type>>
>({
  name: 'AuthorsAtomContext',
})
