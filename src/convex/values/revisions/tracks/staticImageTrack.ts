import { v } from 'convex/values'
import { trackBase } from './trackBase'

export const staticImageTrack = v.object({
  ...trackBase.fields,
  type: v.literal('image-static'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
  alt: v.optional(v.string()),
})
