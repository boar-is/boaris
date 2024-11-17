import type { Atom } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { useAtomValue } from 'jotai/index'
import { useMotionValue } from 'motion/react'
import { useConst } from '~/lib/react/use-const'

export const useAtomMotionValue = <T>(valueAtom: Atom<T>, initialValue: T) => {
  const motionValue = useMotionValue<T>(initialValue)

  useAtomValue(
    useConst(() =>
      atomEffect((get) => {
        motionValue.set(get(valueAtom))
      }),
    ),
  )

  return motionValue
}
