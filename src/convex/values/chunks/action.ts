import { type Infer, v } from 'convex/values'
import { insertAction } from './insertAction'

export const action = v.union(insertAction)

export type Action = Infer<typeof action>
