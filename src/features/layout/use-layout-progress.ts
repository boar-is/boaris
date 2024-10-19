import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { type MotionValue, transform, useMotionValueEvent } from 'framer-motion'
import type { Interpolation } from '~/convex/values/_shared/interpolation'

export const useLayoutProgress$ = ({
  playbackProgress,
  interpolation$,
}: {
  playbackProgress: MotionValue<number>
  interpolation$: Observable<Interpolation>
}) => {
  const layoutProgress$ = useObservable(0)

  useMotionValueEvent(playbackProgress, 'change', (it) => {
    const interpolation = interpolation$.peek()

    layoutProgress$.set(
      transform(it, interpolation.input, interpolation.output),
    )
  })

  return layoutProgress$
}
