import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { SocialLink, socialLink } from './_shared/socialLink'

export const workspace = v.object({
  slug: v.string(),
  name: v.string(),
  logoId: v.optional(v.id('_storage')),
  socialLinks: v.array(socialLink),
})

export class Workspace extends S.Class<Workspace>('Workspace')({
  slug: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
  logoUrl: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  socialLinks: S.Array(SocialLink),
}) {}
