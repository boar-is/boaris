import * as S from '@effect/schema/Schema'
import { PostTrackDynamicImage } from './post-track-dynamic-image'
import { PostTrackStaticImage } from './post-track-static-image'
import { PostTrackText } from './post-track-text'

export const PostTrack = S.Union(
  PostTrackDynamicImage,
  PostTrackStaticImage,
  PostTrackText,
)
