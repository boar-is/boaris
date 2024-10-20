import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'

export const socialLink = v.object({
  href: v.string(),
  label: v.optional(v.string()),
})

export class SocialLink extends S.Class<SocialLink>('SocialLink')({
  href: S.NonEmptyTrimmedString,
  label: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
}) {}
