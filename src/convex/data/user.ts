import { v } from 'convex/values'
import { socialLink } from './_shared/socialLink'

export const user = v.object({
  slug: v.string(),
  name: v.string(),
  avatarUrl: v.optional(v.string()),
  socialLinks: v.array(socialLink),
})
