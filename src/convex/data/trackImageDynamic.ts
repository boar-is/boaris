import { v } from 'convex/values'
import { trackBase } from './trackBase'

export const trackImageDynamic = v.object({
  ...trackBase.fields,
  type: v.literal('image-dynamic'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
})
