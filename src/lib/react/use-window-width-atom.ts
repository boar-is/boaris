import { atom, useSetAtom } from 'jotai/index'
import { useEffect } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { useConstant } from '~/lib/react/use-constant'

export const useWindowWidthAtom = (
  options: Partial<Parameters<typeof useWindowSize>[number]> = {
    debounceDelay: 250,
  },
) => {
  const widthAtom = useConstant(() => atom(0))
  const setWidth = useSetAtom(widthAtom)

  const { width } = useWindowSize({
    ...options,
    initializeWithValue: false,
  })

  useEffect(() => setWidth(width ?? 0), [setWidth, width])

  return widthAtom
}
