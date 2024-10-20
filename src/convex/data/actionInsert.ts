import { v } from 'convex/values'
import { actionBase } from './actionBase'

export const actionInsert = v.object({
  ...actionBase.fields,
  type: v.literal('insert'),
  from: v.number(),
  to: v.optional(v.number()),
  length: v.number(),
  value: v.optional(v.string()),
})
