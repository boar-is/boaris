import { type Atom, atom } from 'jotai'
import type { Layout } from '~/convex/data/layout'

export const layoutModesAtom = (layout: Atom<typeof Layout.Type>) =>
  atom((get) => get(layout).modes)
