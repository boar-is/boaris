import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'

export const socialLink = v.object({
  href: v.string(),
  label: v.optional(v.string()),
})

export class SocialLink extends S.Class<SocialLink>('SocialLink')({
  href: S.NonEmptyTrimmedString,
  label: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
}) {
  static encodedFromEntity({
    href,
    label,
  }: Infer<typeof socialLink>): typeof SocialLink.Encoded {
    return {
      href,
      label,
    }
  }
}
