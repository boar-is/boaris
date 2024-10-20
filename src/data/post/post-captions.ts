import * as S from '@effect/schema/Schema'
import { Interpolation } from '~/data/_shared/interpolation'
import { JsonContent } from '~/data/_shared/json-content'

export class PostCaptions extends S.Class<PostCaptions>('PostCaptions')({
  content: JsonContent,
  interpolation: S.OptionFromUndefinedOr(Interpolation),
}) {}
