import { type Infer, v } from 'convex/values'

export const layoutMode = v.union(
  v.literal('static'),
  v.literal('scrolling'),
  v.literal('watching'),
  v.literal('sliding'),
)

export type LayoutMode = Infer<typeof layoutMode>
