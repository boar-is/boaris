import { useSetAtom } from 'jotai/index'
import { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { useConstAtom } from '~/lib/jotai/use-const-atom'

export const useWindowWidthAtom = (
  options: Partial<Parameters<typeof useWindowSize>[number]> = {
    debounceDelay: 250,
  },
) => {
  const widthAtom = useConstAtom(0)
  const setWidth = useSetAtom(widthAtom)

  const { width } = useWindowSize({
    ...options,
    initializeWithValue: false,
  })

  useEffect(() => setWidth(width ?? 0), [setWidth, width])

  return widthAtom
}
