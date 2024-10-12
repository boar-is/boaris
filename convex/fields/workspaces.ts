import { v } from 'convex/values'
import { socialLink } from '~/convex/values/socialLink'

export const workspaceFields = {
  slug: v.string(),
  name: v.string(),
  logoId: v.optional(v.id('_storage')),
  socialLinks: v.array(socialLink),
}
