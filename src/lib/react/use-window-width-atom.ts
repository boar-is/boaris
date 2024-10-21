import { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { useHookAtom } from '~/lib/jotai/use-hook-atom'

export const useWindowWidthAtom = (
  options: Partial<Parameters<typeof useWindowSize>[number]> = {
    debounceDelay: 250,
  },
) =>
  useHookAtom(0, (setAtomValue) => {
    const { width } = useWindowSize({
      ...options,
      initializeWithValue: false,
    })

    useEffect(() => setAtomValue(width ?? 0), [setAtomValue, width])
  })
