import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'

export const interpolation = v.object({
  input: v.array(v.number()),
  output: v.array(v.number()),
})

export class Interpolation extends Schema.Class<Interpolation>('Interpolation')(
  {
    input: Schema.Array(Schema.Number),
    output: Schema.Array(Schema.Number),
  },
) {
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
