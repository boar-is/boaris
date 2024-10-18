import { useObservable } from '@legendapp/state/react'
import type { Interpolation } from '~/convex/values/_shared/interpolation'
import { usePlaybackProgressContext } from '~/features/playback/playback-progress-provider'

// TODO Implement interpolation
export const useCaptionsProgress$ = ({
  interpolation,
}: { interpolation: Interpolation }) => {
  const { playbackProgress$ } = usePlaybackProgressContext()
  return useObservable(playbackProgress$)
}
