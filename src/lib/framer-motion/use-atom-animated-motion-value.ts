import { identity } from 'effect'
import {
  type ValueAnimationTransition,
  animate,
  useMotionValue,
} from 'framer-motion'
import { type Atom, useAtomValue } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { useConstant } from '~/lib/react/use-constant'

export const useAtomAnimatedMotionValue = <T>(
  valueAtom: Atom<T>,
  {
    initial,
    mapFn = identity,
    ...animateOptions
  }: ValueAnimationTransition<T> & {
    initial: T
    mapFn?: (value: T) => T | undefined
  },
) => {
  const motionValue = useMotionValue(initial)

  useAtomValue(
    useConstant(() =>
      atomEffect((get) => {
        const value = mapFn(get(valueAtom))
        if (value !== undefined) {
          animate(motionValue, value, animateOptions)
        }
      }),
    ),
  )

  return motionValue
}
