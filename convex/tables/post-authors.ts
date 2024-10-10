import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const postAuthors = defineTable({
  postId: v.id('posts'),
  authorId: v.id('users'),
})
  .index('by_postId', ['postId'])
  .index('by_authorId', ['authorId'])
