import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { PropsWithGetUrl } from '~/lib/regexes/props-with-get-url'

export const revision = v.object({
  title: v.string(),
  lead: v.optional(v.string()),
  description: v.string(),
  posterId: v.optional(v.id('_storage')),
})

export class Revision extends Schema.Class<Revision>('Revision')({
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  description: Schema.NonEmptyTrimmedString,
  posterUrl: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
}) {
  static async encodedFromEntity(
    { title, lead, description, posterId }: Infer<typeof revision>,
    { getUrl }: PropsWithGetUrl,
  ): Promise<typeof Revision.Encoded> {
    return {
      title,
      lead,
      description,
      posterUrl: posterId && (await getUrl(posterId)),
    }
  }
}
