import { defineTable } from 'convex/server'
import { v } from 'convex/values'
import { socialLink } from '~/convex/values/social-link'

export const users = defineTable({
  slug: v.string(),
  name: v.string(),
  avatarId: v.optional(v.id('_storage')),
  socialLinks: v.optional(v.array(socialLink)),
}).index('by_slug', ['slug'])
