import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'

export const post = v.object({
  slug: v.string(),
  title: v.string(),
  lead: v.optional(v.string()),
  description: v.string(),
  thumbnailId: v.optional(v.id('_storage')),
  projectId: v.id('projects'),
  draftRevisionId: v.id('revisions'),
  publishedRevisionId: v.optional(v.id('revisions')),
  revisionStorageIds: v.array(v.id('_storage')),
})

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  title: Schema.NonEmptyTrimmedString,
  lead: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  description: Schema.NonEmptyTrimmedString,
  thumbnailUrl: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  date: Schema.DateFromNumber,
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return async ({
      slug,
      title,
      lead,
      description,
      thumbnailId,
      _creationTime,
    }: Infer<typeof post> & {
      _creationTime: number
    }): Promise<typeof Post.Encoded> => ({
      slug,
      title,
      lead,
      description,
      thumbnailUrl: thumbnailId && (await getUrl(thumbnailId)),
      date: _creationTime,
    })
  }
}
