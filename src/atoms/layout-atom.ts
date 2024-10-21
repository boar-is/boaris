import { type Atom, atom } from 'jotai'
import type { Revision } from '~/convex/data/revision'

export const layoutAtom = (revision: Atom<typeof Revision.Type>) =>
  atom((get) => get(revision).layout)
