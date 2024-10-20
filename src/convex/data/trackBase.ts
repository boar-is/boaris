import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { Action } from './action'

export const trackBase = v.object({
  id: v.string(),
  name: v.string(),
})

export class TrackBase extends S.Class<TrackBase>('TrackBase')({
  id: S.NonEmptyTrimmedString,
  name: S.NonEmptyTrimmedString,
  actions: S.Array(Action),
}) {}
