import type { Interpolation } from '~/lib/db/_shared'

export type CaptionsTrack = {
  path: '.meta/captions'
  /**
   * JSON.stringified JSONContent
   */
  content: string
  progressInterpolation: Interpolation
}
