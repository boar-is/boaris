import { useEffect, useRef } from 'react'

export const usePreviousRef = <T>(value: T) => {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}
