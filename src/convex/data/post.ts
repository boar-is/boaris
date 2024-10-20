import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'

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
}) {}
