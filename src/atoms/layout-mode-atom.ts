import * as HS from 'effect/HashSet'
import { type Atom, atom } from 'jotai'
import type { LayoutMode } from '~/convex/data/layoutMode'

export const layoutModeAtom = (
  layoutModes: Atom<HS.HashSet<typeof LayoutMode.Type>>,
) =>
  atom((get) => {
    const modes = get(layoutModes)

    if (HS.has(modes, 'static')) {
      return 'static'
    }

    if (HS.has(modes, 'scrolling')) {
      return 'scrolling'
    }

    if (HS.has(modes, 'sliding')) {
      return 'sliding'
    }

    return 'watching'
  })
