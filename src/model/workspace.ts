import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import { SocialLink, socialLink } from './socialLink'

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
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return async ({
      slug,
      name,
      logoId,
      socialLinks,
    }: Infer<typeof workspace>): Promise<typeof Workspace.Encoded> => ({
      slug,
      name,
      logoUrl: logoId && (await getUrl(logoId)),
      socialLinks: socialLinks.map(SocialLink.encodedFromEntity),
    })
  }
}
