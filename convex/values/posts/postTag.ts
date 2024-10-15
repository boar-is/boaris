import { type Infer, v } from 'convex/values'

export const postTag = v.object({
  postId: v.id('posts'),
  tagId: v.id('tags'),
})

export type PostTag = Infer<typeof postTag>
