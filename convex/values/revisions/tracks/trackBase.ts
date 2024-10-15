import { type Infer, v } from 'convex/values'

export const trackBase = v.object({
  id: v.string(),
  name: v.string(),
})

export type TrackBase = Infer<typeof trackBase>
