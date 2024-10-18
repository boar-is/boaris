import { useMemo } from 'react'
import type { Captions } from '~/convex/values/revisions/captions/captions'
import { useLayoutChangesContext } from '~/features/layout/layout-changes-provider'

export const useCaptions = ({
  captions,
}: {
  captions?: Captions | undefined
}) => {
  // TODO Implement cutting skipped parts
  // TODO Implement compound interpolation
  const layoutChanges = useLayoutChangesContext()

  if (!captions) {
    return undefined
  }

  return useMemo(() => captions, [captions])
}
