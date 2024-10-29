import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const socialLink = v.object({
  href: v.string(),
  label: v.optional(v.string()),
})

export class SocialLink extends Schema.Class<SocialLink>('SocialLink')({
  href: Schema.NonEmptyTrimmedString,
  label: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
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
