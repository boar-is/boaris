import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Tag } from '~/model/tag'

export const [TagsAtomContext, useTagsAtom] = createStrictContext<
  Atom<ReadonlyArray<typeof Tag.Type>>
>({
  name: 'TagsAtomContext',
})
