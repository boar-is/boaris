import type { JSONContent } from '@tiptap/react'
import type { Interpolation, TrackBase } from '~/lib/model/tracks/_shared'

export type CaptionsTrack = TrackBase & {
  path: '.meta/captions'
  content: JSONContent
  progressInterpolation?: Interpolation | undefined
}
