import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import { Interpolation, interpolation } from './_shared/interpolation'
import { JsonContent, jsonContent } from './_shared/jsonContent'

export const captions = v.object({
  content: jsonContent,
  interpolation: interpolation,
})

export class Captions extends S.Class<Captions>('Captions')({
  content: JsonContent,
  interpolation: Interpolation,
}) {
  static encodedFromEntity({
    content,
    interpolation,
  }: Infer<typeof captions>): typeof Captions.Encoded {
    return {
      content,
      interpolation: Interpolation.encodedFromEntity(interpolation),
    }
  }
}
