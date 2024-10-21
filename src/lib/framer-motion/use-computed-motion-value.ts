import {
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion'

export const useComputedMotionValue = <T>(
  motionValue: MotionValue<T>,
  fn: (value: T | undefined) => T | undefined,
) => {
  const newValue = useMotionValue<T | undefined>(undefined)

  useMotionValueEvent(motionValue, 'change', (it) => {
    const result = fn(it)
    result && newValue.set(result)
  })

  return newValue
}
