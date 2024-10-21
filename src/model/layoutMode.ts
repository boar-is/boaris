import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import * as HS from 'effect/HashSet'

export const layoutMode = v.union(
  v.literal('static'),
  v.literal('scrolling'),
  v.literal('watching'),
  v.literal('sliding'),
)

export const LayoutMode = S.Literal(
  'static',
  'scrolling',
  'watching',
  'sliding',
)

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
