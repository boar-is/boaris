import { type Infer, v } from 'convex/values'
import { action } from './action'

export const chunk = v.object({
  revisionId: v.id('revisions'),
  offset: v.number(),
  /**
   * Record's key is for track's id
   */
  actions: v.record(v.string(), v.array(action)),
})

export type Chunk = Infer<typeof chunk>
