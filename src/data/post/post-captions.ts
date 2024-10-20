import * as S from '@effect/schema/Schema'
import { Interpolation } from '~/data/_shared/interpolation'

export class PostCaptions extends S.Class<PostCaptions>('PostCaptions')({
  content: S.Any,
  interpolation: S.OptionFromUndefinedOr(Interpolation),
}) {}
