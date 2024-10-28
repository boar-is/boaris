import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const post = v.object({
  slug: v.string(),
  projectId: v.id('projects'),
  draftRevisionId: v.id('revisions'),
  publishedRevisionId: v.optional(v.id('revisions')),
})

export class Post extends Schema.Class<Post>('Post')({
  slug: Schema.NonEmptyTrimmedString,
  date: Schema.DateFromNumber,
}) {
  static encodedFromEntity({
    slug,
    _creationTime,
  }: Infer<typeof post> & {
    _creationTime: number
  }): typeof Post.Encoded {
    return {
      slug,
      date: _creationTime,
    }
  }
}
