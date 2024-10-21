import * as HS from 'effect/HashSet'
import type { LayoutMode } from '~/convex/data/layoutMode'

export const determineLayoutMode = (
  modes: HS.HashSet<typeof LayoutMode.Type>,
) => {
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
}
