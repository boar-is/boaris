import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const postTags = defineTable({
  postId: v.id('posts'),
  tagId: v.id('tags'),
})
  .index('by_postId', ['postId'])
  .index('by_tagId', ['tagId'])
