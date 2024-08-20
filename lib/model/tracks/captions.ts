import type { Interpolation } from '~/lib/model/tracks/_shared'

export type CaptionsTrack = {
  path: '.meta/captions'
  /**
   * JSON.stringified JSONContent
   */
  content: string
  progressInterpolation?: Interpolation | undefined
}
