import * as S from '@effect/schema/Schema'
import { PostTrackImageDynamic } from './post-track-image-dynamic'
import { PostTrackImageStatic } from './post-track-image-static'
import { PostTrackText } from './post-track-text'

export const PostTrack = S.Union(
  PostTrackImageDynamic,
  PostTrackImageStatic,
  PostTrackText,
)
