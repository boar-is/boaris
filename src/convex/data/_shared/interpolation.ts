import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'

export const interpolation = v.object({
  input: v.array(v.number()),
  output: v.array(v.number()),
})

export class Interpolation extends S.Class<Interpolation>('Interpolation')({
  input: S.NonEmptyArray(S.Number),
  output: S.NonEmptyArray(S.Number),
}) {}
