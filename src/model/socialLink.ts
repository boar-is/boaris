import { type Infer, v } from 'convex/values'
import { Option, Schema } from 'effect'
import { matchSocialNetworkName } from '~/features/match-social-network-name'

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

export const getComputedLabel = ({ label, href }: typeof SocialLink.Type) =>
  label.pipe(
    Option.orElse(() => matchSocialNetworkName(href)),
    Option.getOrElse(() => 'Link'),
  )
