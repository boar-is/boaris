import { v } from 'convex/values'

export const postAuthor = v.object({
  postId: v.id('posts'),
  authorId: v.id('users'),
})
