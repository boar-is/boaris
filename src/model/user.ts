import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import { SocialLink, socialLink } from './socialLink'

export const user = v.object({
  slug: v.string(),
  name: v.string(),
  avatarUrl: v.optional(v.string()),
  socialLinks: v.array(socialLink),
})

export class User extends Schema.Class<User>('User')({
  slug: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
  avatarUrl: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  socialLinks: Schema.Array(SocialLink),
}) {
  static encodedFromEntity({
    slug,
    name,
    avatarUrl,
    socialLinks,
  }: Infer<typeof user>): typeof User.Encoded {
    return {
      slug,
      name,
      avatarUrl,
      socialLinks: socialLinks.map(SocialLink.encodedFromEntity),
    }
  }
}
