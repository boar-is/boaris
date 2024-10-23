import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'

export const interpolation = v.object({
  input: v.array(v.number()),
  output: v.array(v.number()),
})

export class Interpolation extends S.Class<Interpolation>('Interpolation')({
  input: S.Array(S.Number),
  output: S.Array(S.Number),
}) {
  static encodedFromEntity({
    input,
    output,
  }: Infer<typeof interpolation>): typeof Interpolation.Encoded {
    return {
      input,
      output,
    }
  }
}
