import { defineTable } from 'convex/server'
import { v } from 'convex/values'
import { socialLink } from '~/convex/values/socialLink'

export const users = defineTable({
  slug: v.string(),
  name: v.string(),
  avatarUrl: v.optional(v.string()),
  socialLinks: v.optional(v.array(socialLink)),
}).index('by_slug', ['slug'])
