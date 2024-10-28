import { v } from 'convex/values'
import { Schema } from 'effect'

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
