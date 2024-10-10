import { defineTable } from 'convex/server'
import { v } from 'convex/values'

const action = v.object({
  offset: v.number(),
})

export const chunks = defineTable({
  revisionId: v.id('revisions'),
  offset: v.number(),
  /**
   * Record's key is for track's id
   */
  actions: v.record(v.string(), v.array(action)),
})
