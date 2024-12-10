'use client'

import { type PrimitiveAtom, useSetAtom } from 'jotai'
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
  captions,
  layout,
}: { captions: ReactNode; layout: ReactNode }) {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useContainerHeightSync({ contentRef })

  const progress$ = useConstAtom(0)
  const setProgress = useSetAtom(progress$)
  useScrollProgressEffect({
    ref: containerRef,
    onUpdate: (progress) => {
      containerRef.current?.style.height && setProgress(progress)
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
        <div className="sticky top-0 h-dvh flex flex-col lg:flex-row lg:*:flex-1 justify-center">
          <div
            className="flex-1 overflow-hidden fade-y-64 py-24"
            ref={scrollableRef}
          >
            <div ref={contentRef}>{captions}</div>
          </div>
          <div className="shrink basis-auto max-h-[50%] lg:max-h-[80%] lg:self-center ~pb-2/4">
            {layout}
          </div>
        </div>
      </div>
    </PostContentContext>
  )
}
