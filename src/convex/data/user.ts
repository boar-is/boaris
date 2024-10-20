import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import { SocialLink, socialLink } from './_shared/socialLink'

export const user = v.object({
  slug: v.string(),
  name: v.string(),
  avatarUrl: v.optional(v.string()),
  socialLinks: v.array(socialLink),
})

export class User extends S.Class<User>('User')({
  slug: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
  avatarUrl: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  socialLinks: S.Array(SocialLink),
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
