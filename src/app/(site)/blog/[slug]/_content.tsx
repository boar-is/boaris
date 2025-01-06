'use client'

import { type PrimitiveAtom, useSetAtom } from 'jotai'
import { transform } from 'motion'
import dynamic from 'next/dynamic'
import { type RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { usePostPage } from '~/app/(site)/blog/[slug]/provider'
import { fixScrollUpdateSafariIos } from '~/lib/dom/fix-scroll-update-safari-ios'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { useScrollProgressEffect } from '~/lib/motion/use-scroll-progress-effect'
import { StaticEditorContent } from '~/lib/pm/static-editor-content'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { cx } from '~/lib/react/cx'
import { useContainerHeightSync } from '~/lib/react/use-container-height-sync'

const PostCaptions = dynamic(() =>
  import('./_captions').then((m) => m.PostCaptions),
)

const captionsCx = cx('mx-auto typography w-full drop-shadow-md')
function PostCaptionsWrapper() {
  const [initialized, setInitialized] = useState(false)

  const {
    post: { captions },
  } = usePostPage()

  return (
    <>
      {!initialized && (
        <StaticEditorContent className={captionsCx} content={captions} />
      )}
      <PostCaptions
        className={captionsCx}
        onEditor={(editor) => setInitialized(!!editor)}
      />
    </>
  )
}

const PostLayout = dynamic(() => import('./_layout').then((m) => m.PostLayout))

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
  interpolation,
}: {
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
            <div ref={contentRef}>
              <PostCaptionsWrapper />
            </div>
          </div>
          <div className="shrink basis-auto max-h-[50%] lg:max-h-[80%] lg:h-full lg:self-center ~pb-2/4">
            <PostLayout />
          </div>
        </div>
      </div>
    </PostContentContext>
  )
}
