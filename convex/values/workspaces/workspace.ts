import { v } from 'convex/values'
import { socialLink } from '~/convex/values/_shared/socialLink'

export const workspace = v.object({
  slug: v.string(),
  name: v.string(),
  logoId: v.optional(v.id('_storage')),
  socialLinks: v.array(socialLink),
})
