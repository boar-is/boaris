import { v } from 'convex/values'
import { HashSet, Schema } from 'effect'

export const layoutMode = v.union(
  v.literal('static'),
  v.literal('scrolling'),
  v.literal('watching'),
  v.literal('sliding'),
)

export const LayoutMode = Schema.Literal(
  'static',
  'scrolling',
  'watching',
  'sliding',
)

export const determinedLayoutMode = (
  modes: HashSet.HashSet<typeof LayoutMode.Type>,
) => {
  if (HashSet.has(modes, 'static')) {
    return 'static'
  }

  if (HashSet.has(modes, 'scrolling')) {
    return 'scrolling'
  }

  if (HashSet.has(modes, 'sliding')) {
    return 'sliding'
  }

  return 'watching'
}
