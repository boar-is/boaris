import type { MotionValue } from 'framer-motion'
import type { Interpolation } from '~/convex/values/_shared/interpolation'

// TODO Implement interpolation
export const useCaptionsProgress = ({
  playbackProgress,
  interpolation,
}: {
  playbackProgress: MotionValue<number>
  interpolation?: Interpolation | undefined
}) => {
  return playbackProgress
}
