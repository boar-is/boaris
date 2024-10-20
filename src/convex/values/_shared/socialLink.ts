import { v } from 'convex/values'

export const socialLink = v.object({
  href: v.string(),
  label: v.optional(v.string()),
})
