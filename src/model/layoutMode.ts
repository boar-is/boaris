import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'

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
