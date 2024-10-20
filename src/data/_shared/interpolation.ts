import { Schema } from '@effect/schema'

export class Interpolation extends Schema.Class<Interpolation>('Interpolation')(
  {
    input: Schema.NonEmptyArray(Schema.Number),
    output: Schema.NonEmptyArray(Schema.Number),
  },
) {}
