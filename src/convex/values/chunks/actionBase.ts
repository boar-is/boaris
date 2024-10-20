import { type Infer, v } from 'convex/values'

export const actionBase = v.object({
  offset: v.number(),
})

export type ActionBase = Infer<typeof actionBase>
