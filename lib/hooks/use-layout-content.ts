import { useEffect, useMemo, useRef } from 'react'
import { diffpatcher } from '~/lib/diffpatcher'
import type { LayoutContent, LayoutValue } from '~/lib/model/revision/layout'
import { patchLayoutContent } from '~/lib/utils/patch-layout-content'

export const useLayoutContent = (value: LayoutValue, headIndex: number) => {
  const anchorIndexRef = useRef<number>()
  useEffect(() => {
    anchorIndexRef.current = headIndex
  }, [headIndex])

  const previousContentRef = useRef<LayoutContent>({})
  const content = useMemo(
    () =>
      patchLayoutContent(
        diffpatcher.clone(previousContentRef.current) as LayoutContent,
        value,
        anchorIndexRef.current,
        headIndex,
      ),
    [value, headIndex],
  )
  useEffect(() => {
    previousContentRef.current = content
  }, [content])
  return content
}
