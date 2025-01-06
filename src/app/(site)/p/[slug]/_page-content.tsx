'use client'

import type { PrimitiveAtom } from 'jotai'
import { useSetAtom } from 'jotai/index'
import { transform } from 'motion'
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { fixScrollUpdateSafariIos } from '~/lib/dom/fix-scroll-update-safari-ios'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { useScrollProgressEffect } from '~/lib/motion/use-scroll-progress-effect'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { useContainerHeightSync } from '~/lib/react/use-container-height-sync'

export type PostContentContextValue = {
  progress$: PrimitiveAtom<number>
  scrollableRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
}

export const [PostContentContext, usePostContent] =
  createStrictContext<PostContentContextValue>({
    name: 'PostContentContext',
  })

export function PostContent({
  captionsSlot,
  layoutSlot,
  interpolation,
}: {
  captionsSlot: ReactNode
  layoutSlot: ReactNode
  interpolation: { input: ReadonlyArray<number>; output: ReadonlyArray<number> }
}) {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useContainerHeightSync({ contentRef })

  const progress$ = useConstAtom(0)
  const setProgress = useSetAtom(progress$)

  const transformProgress = transform(
    [...interpolation.input],
    [...interpolation.output],
  )

  useScrollProgressEffect({
    ref: containerRef,
    onUpdate: (progress) => {
      containerRef.current?.style.height &&
        setProgress(transformProgress(progress))
    },
  })
  // TODO still need this?
  useEffect(() => fixScrollUpdateSafariIos(), [])

  const contextValue = useMemo(
    (): PostContentContextValue => ({ progress$, scrollableRef, contentRef }),
    [progress$],
  )

  return (
    <PostContentContext value={contextValue}>
      <div className="relative container" ref={containerRef}>
        <div className="sticky top-0 h-dvh flex flex-col lg:flex-row lg:*:flex-1 justify-center gap-0 lg:gap-4">
          <div
            className="flex-1 overflow-hidden ~fade-y-12/64 ~py-8/24"
            ref={scrollableRef}
          >
            <div ref={contentRef}>{captionsSlot}</div>
          </div>
          <div className="shrink basis-auto max-h-[50%] lg:max-h-[80%] lg:h-full lg:self-center ~pb-2/4">
            {layoutSlot}
          </div>
        </div>
      </div>
    </PostContentContext>
  )
}
