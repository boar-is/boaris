import * as S from '@effect/schema/Schema'
import { PostLayoutChange } from './post-layout-change'
import { PostLayoutMode } from './post-layout-mode'
import { PostLayoutOverride } from './post-layout-override'

export class PostLayout extends S.Class<PostLayout>('PostLayout')({
  modes: S.NonEmptyArray(PostLayoutMode),
  changes: S.Array(PostLayoutChange),
  overrides: S.Array(PostLayoutOverride),
}) {}
