import type { Observable } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import { transform } from 'framer-motion'
import type { Interpolation } from '~/convex/values/_shared/interpolation'

export const useLayoutProgress$ = ({
  progress$,
  interpolation$,
}: {
  progress$: Observable<number>
  interpolation$: Observable<Interpolation>
}) =>
  useObservable<number>(() => {
    const interpolation = interpolation$.get()
    return transform(progress$.get(), interpolation.input, interpolation.output)
  })
