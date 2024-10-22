import type { Atom } from 'jotai'
import { createStrictContext } from '~/lib/react/create-strict-context'
import type { Track } from '~/model/track'

export const [TracksAtomContext, useTracksAtom] = createStrictContext<
  Atom<ReadonlyArray<typeof Track.Type>>
>({
  name: 'TracksAtomContext',
})
