import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { ActionInsert, actionInsert } from './actionInsert'

export const action = v.union(actionInsert)

export const Action = S.Union(ActionInsert)
