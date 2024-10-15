import { type Infer, v } from 'convex/values'

export const socialLink = v.object({
  href: v.string(),
  label: v.optional(v.string()),
})

export type SocialLink = Infer<typeof socialLink>
