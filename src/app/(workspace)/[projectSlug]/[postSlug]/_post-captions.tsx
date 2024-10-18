'use client'

import type { Captions } from '~/convex/values/revisions/captions/captions'
import { useCaptions } from '~/features/captions/use-captions'
import { useLayoutMode } from '~/features/layout/layout-mode-provider'

export function PostCaptions({ captions }: { captions: Captions }) {
  const {} = useLayoutMode()
  const postCaptions = useCaptions({ captions })

  return <div>captions</div>
}

function ScrollingCaptions() {
  return <div>1</div>
}

function EmptyCaptions() {
  return <div>TODO</div>
}
