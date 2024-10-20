import * as S from '@effect/schema/Schema'
import { PostTrackActionInsert } from './post-track-action-insert'

export const PostTrackAction = S.Union(PostTrackActionInsert)
