import { useMotionValue } from 'framer-motion'
import type { Atom } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { useAtomValue } from 'jotai/index'
import { useConstant } from '~/lib/react/use-constant'

export const useAtomMotionValue = <T>(valueAtom: Atom<T>, initialValue: T) => {
  const motionValue = useMotionValue<T>(initialValue)

  useAtomValue(
    useConstant(() =>
      atomEffect((get) => {
        motionValue.set(get(valueAtom))
      }),
    ),
  )

  return motionValue
}
