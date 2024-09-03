import type { JSONContent } from '@tiptap/react'
import type { Interpolation } from '~/lib/model/tracks/_shared'

export type CaptionsTrack = {
  path: '.meta/captions'
  content: JSONContent
  progressInterpolation?: Interpolation | undefined
}
