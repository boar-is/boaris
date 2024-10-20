import * as S from '@effect/schema/Schema'
import { Delta } from '~/data/_shared/delta'
import { PostLayoutMode } from './post-layout-mode'

export class PostLayoutOverride extends S.Class<PostLayoutOverride>(
  'PostLayoutOverride',
)({
  modes: S.NonEmptyArray(PostLayoutMode),
  minWidth: S.OptionFromUndefinedOr(S.Number),
  changesDelta: Delta,
}) {}
