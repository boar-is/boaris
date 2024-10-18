import type { Interpolation } from '~/convex/values/_shared/interpolation'
import { usePlaybackProgress } from '~/features/playback/playback-progress-provider'

// TODO Implement interpolation
export const useCaptionsProgress = ({
  interpolation,
}: { interpolation: Interpolation }) => {
  const playbackProgress = usePlaybackProgress()
  return playbackProgress
}
