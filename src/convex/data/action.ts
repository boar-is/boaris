import { v } from 'convex/values'
import { actionInsert } from './actionInsert'

export const action = v.union(actionInsert)
