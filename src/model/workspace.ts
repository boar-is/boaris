import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import { SocialLink, socialLink } from './socialLink'

export const workspace = v.object({
  slug: v.string(),
  name: v.string(),
  description: v.string(),
  logoId: v.optional(v.id('_storage')),
  socialLinks: v.array(socialLink),
})

export class Workspace extends Schema.Class<Workspace>('Workspace')({
  slug: Schema.NonEmptyTrimmedString,
  name: Schema.NonEmptyTrimmedString,
  description: Schema.NonEmptyTrimmedString,
  logoUrl: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  socialLinks: Schema.Array(SocialLink),
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return async ({
      slug,
      name,
      description,
      logoId,
      socialLinks,
    }: Infer<typeof workspace>): Promise<typeof Workspace.Encoded> => ({
      slug,
      name,
      description,
      logoUrl: logoId && (await getUrl(logoId)),
      socialLinks: socialLinks.map(SocialLink.encodedFromEntity),
    })
  }
}
