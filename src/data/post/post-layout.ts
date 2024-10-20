import * as S from '@effect/schema/Schema'
import { PostLayoutLayer } from './post-layout-layer'

export class PostLayout extends S.Class<PostLayout>('PostLayout')({
  static: S.OptionFromUndefinedOr(PostLayoutLayer),
  floating: S.OptionFromUndefinedOr(PostLayoutLayer),
}) {}
