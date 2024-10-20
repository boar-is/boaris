import { Schema } from '@effect/schema'
import { Interpolation } from '~/data/_shared/interpolation'

export class PostCaptions extends Schema.Class<PostCaptions>('PostCaptions')({
  content: Schema.Any,
  interpolation: Schema.OptionFromUndefinedOr(Interpolation),
}) {}
