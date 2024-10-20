import * as S from '@effect/schema/Schema'
import { v } from 'convex/values'
import { TrackImageDynamic, trackImageDynamic } from './trackImageDynamic'
import { TrackImageStatic, trackImageStatic } from './trackImageStatic'
import { TrackText, trackText } from './trackText'

export const track = v.union(trackImageDynamic, trackImageStatic, trackText)

export const Track = S.Union(TrackImageDynamic, TrackImageStatic, TrackText)
