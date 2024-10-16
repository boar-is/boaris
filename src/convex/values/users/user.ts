import { type Infer, v } from 'convex/values'
import { socialLink } from '~/convex/values/_shared/socialLink'

export const user = v.object({
  slug: v.string(),
  name: v.string(),
  avatarUrl: v.optional(v.string()),
  socialLinks: v.optional(v.array(socialLink)),
})

export type User = Infer<typeof user>
