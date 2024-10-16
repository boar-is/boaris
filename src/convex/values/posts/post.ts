import { type Infer, v } from 'convex/values'

export const post = v.object({
  slug: v.string(),
  title: v.string(),
  lead: v.optional(v.string()),
  description: v.string(),
  thumbnailId: v.optional(v.id('_storage')),
  projectId: v.id('projects'),
  draftRevisionId: v.id('revisions'),
  publishedRevisionId: v.optional(v.id('revisions')),
  revisionStorageIds: v.optional(v.array(v.id('_storage'))),
})

export type Post = Infer<typeof post>
