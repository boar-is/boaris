'use client'

import { Memo } from '@legendapp/state/react'
import { useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { useWorkspaceProjectPostContext } from '~/src/app/[projectSlug]/[postSlug]/context'
import { useScrollYProgress } from '~/src/hooks/use-scroll-y-progress'

export function WorkspaceProjectClientPage() {
  const state$ = useWorkspaceProjectPostContext()

  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const scrollYProgress = useScrollYProgress({ ref: scrollableRef })
  useMotionValueEvent(scrollYProgress, 'change', (progress) =>
    state$.scrollYProgress.set(progress ?? 0),
  )

  const { width } = useWindowSize({
    debounceDelay: 250,
  })
  useEffect(() => state$.windowWidth.set(width), [state$, width])

  return (
    <div>
      <div className="fixed bottom-0 left-0">
        <div>
          <Memo>{state$.scrollYProgress}</Memo>
        </div>
      </div>
      <div className="h-[400dvh] bg-gray-12/5" ref={scrollableRef}>
        2
      </div>
    </div>
  )
}
