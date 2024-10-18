import { useMemo } from 'react'
import type { Captions } from '~/convex/values/revisions/captions/captions'
import { useLayoutChanges$ } from '~/features/layout/layout-changes-provider'

export const useCaptions = ({
  captions,
}: {
  captions: Captions
}) => {
  // TODO Implement cutting skipped parts
  // TODO Implement compound interpolation
  const layoutChanges$ = useLayoutChanges$()

  return useMemo(() => captions, [captions])
}
