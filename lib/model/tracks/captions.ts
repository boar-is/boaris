import type { JSONContent } from '@tiptap/react'
import type { Interpolation, TrackBase } from '~/lib/model/tracks/_shared'

export type CaptionsTrack = TrackBase & {
  path: `.meta/${string}.captions`
  initialContent: JSONContent
  progressInterpolation?: Interpolation | undefined
}
