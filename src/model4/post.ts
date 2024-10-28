import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'

export const post = v.object({
  slug: v.string(),
  title: v.string(),
  lead: v.optional(v.string()),
  description: v.string(),
  posterId: v.optional(v.id('_storage')),
  projectId: v.id('projects'),
  draftRevisionId: v.id('revisions'),
  publishedRevisionId: v.optional(v.id('revisions')),
})

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  description: Schema.NonEmptyTrimmedString,
  posterUrl: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  date: Schema.DateFromNumber,
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return async ({
      slug,
      title,
      lead,
      description,
      posterId,
      _creationTime,
    }: Infer<typeof post> & {
      _creationTime: number
    }): Promise<typeof Post.Encoded> => ({
      slug,
      title,
      lead,
      description,
      posterUrl: posterId && (await getUrl(posterId)),
      date: _creationTime,
    })
  }
}
