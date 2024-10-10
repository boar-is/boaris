import { defineTable } from 'convex/server'
import { v } from 'convex/values'
import { socialLink } from '~/convex/values/socialLink'

export const workspaces = defineTable({
  slug: v.string(),
  name: v.string(),
  logoId: v.optional(v.id('_storage')),
  socialLinks: v.array(socialLink),
}).index('by_slug', ['slug'])
