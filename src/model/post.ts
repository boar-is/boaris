import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'
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

export class Post extends S.Class<Post>('Post')({
  slug: S.NonEmptyTrimmedString,
  title: S.NonEmptyTrimmedString,
  lead: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  description: S.NonEmptyTrimmedString,
  thumbnailUrl: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  date: S.DateFromNumber,
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
