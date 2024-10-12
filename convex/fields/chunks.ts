import { v } from 'convex/values'

export const chunkFields = {
  revisionId: v.id('revisions'),
  offset: v.number(),
  /**
   * Record's key is for track's id
   */
  actions: v.record(
    v.string(),
    v.array(
      v.object({
        offset: v.number(),
      }),
    ),
  ),
}
