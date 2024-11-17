import { identity } from 'effect'
import { type Atom, useAtomValue } from 'jotai'
import { atomEffect } from 'jotai-effect'
import {
  type ValueAnimationTransition,
  animate,
  useMotionValue,
} from 'motion/react'
import { useConst } from '~/lib/react/use-const'

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
    useConst(() =>
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
