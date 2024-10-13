'use client'

import { Computed, Memo } from '@legendapp/state/react'
import { useResizeObserver } from '@react-aria/utils'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'
import { Image } from '~/src/primitives/image'
import { useWorkspaceProjectPostContext } from './context'

export function WorkspaceProjectClientPage() {
  const state$ = useWorkspaceProjectPostContext()

  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({ target: scrollableRef })
  useMotionValueEvent(scrollYProgress, 'change', (progress) =>
    state$.scrollYProgress.set(progress ?? 0),
  )
  useResizeObserver({
    ref: scrollableRef,
    onResize: () => window.scrollTo({ top: window.scrollY + 1 }),
  })

  const { width } = useWindowSize({
    debounceDelay: 250,
  })
  useEffect(() => state$.windowWidth.set(width), [state$, width])

  return (
    <article className="flex flex-col gap-8 items-center">
      <header className="max-w-prose">
        <hgroup className="flex flex-col gap-4">
          <Computed>
            {() => {
              const thumbnailUrl = state$.post.thumbnailUrl.get()

              if (!thumbnailUrl) {
                return null
              }

              const postTitle = state$.post.title.get()
              return (
                <figure className="relative">
                  <Image
                    src={thumbnailUrl}
                    alt={`${postTitle}'s thumbnail's blur`}
                    width={1024}
                    height={768}
                    className="absolute rounded-2xl blur-2xl opacity-35 pointer-events-none"
                  />
                  <Image
                    src={thumbnailUrl}
                    alt={`${postTitle}'s thumbnail`}
                    width={1024}
                    height={768}
                    className="rounded-2xl drop-shadow-xl"
                  />
                </figure>
              )
            }}
          </Computed>
          <h1 className="text-4xl text-gray-12 font-semibold tracking-tight text-balance">
            <Memo>{state$.post.title}</Memo>
          </h1>
          <Computed>
            {() => {
              const lead = state$.post.lead.get()

              return (
                lead && (
                  <p className="text-gray-10 text-pretty text-lg font-medium">
                    {lead}
                  </p>
                )
              )
            }}
          </Computed>
        </hgroup>
      </header>
      <section>content</section>
    </article>
  )
}
