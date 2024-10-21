import {
  type ValueAnimationTransition,
  animate,
  useMotionValue,
} from 'framer-motion'
import { type Atom, useAtomValue } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { useConstant } from '~/lib/react/use-constant'

export const useAtomAnimatedMotionValue = <T>(
  value$: Atom<T>,
  initial: T,
  options: ValueAnimationTransition<T>,
) => {
  const motionValue = useMotionValue(initial)

  useAtomValue(
    useConstant(() =>
      atomEffect((get) => {
        animate(motionValue, get(value$), options)
      }),
    ),
  )

  return motionValue
}
