import { v } from 'convex/values'
import { socialLink } from '~/convex/values/socialLink'

export const userFields = {
  slug: v.string(),
  name: v.string(),
  avatarUrl: v.optional(v.string()),
  socialLinks: v.optional(v.array(socialLink)),
}
