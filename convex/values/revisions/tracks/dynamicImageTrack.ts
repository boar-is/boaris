import { type Infer, v } from 'convex/values'
import { trackBase } from './trackBase'

export const dynamicImageTrack = v.object({
  ...trackBase.fields,
  type: v.literal('dynamic-image'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
})

export type DynamicImageTrack = Infer<typeof dynamicImageTrack>
