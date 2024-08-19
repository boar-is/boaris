'use client'

import { useResizeObserver } from '@react-aria/utils'
import { type Editor, useEditor } from '@tiptap/react'
import {
  type MotionStyle,
  type MotionValue,
  animate,
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { type RefObject, useMemo, useRef } from 'react'
import { Image } from '~/components/image'
import { TextEditor } from '~/components/text-editor'
import type { BlogPostVm } from '~/lib/api/get-blog-post'
import { cx } from '~/lib/cx'
import { JetBrainsMono } from '~/lib/fonts'
import { extensions } from '~/lib/tiptap/extensions'

const inlineTags = new Set(['code', 'span', 'strong', 'em', 'u', 's', 'a'])

export function BlogPostPageClient({ post }: { post: BlogPostVm }) {
  const speed = 1 / 15
  const cursorLength = 25

  const content = post.captions

  const editor = useEditor(
    {
      editable: false,
      extensions,
      content,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
    },
    [content],
  )

  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const contentY = useMotionValue<number | undefined>(undefined)
  const scrollableHeight = useMotionValue<number | undefined>(undefined)

  const { scrollY } = useScroll()
  const scrollYProgress = useTransform(scrollY, (scrollYValue) => {
    const scrollableEl = scrollableRef.current
    if (!scrollableEl) {
      return null
    }

    const relativeScrollY = scrollYValue - scrollableEl.offsetTop
    const progress = relativeScrollY / scrollableEl.offsetHeight
    return Math.max(0, Math.min(1, progress))
  })

  const position = useTransform(scrollYProgress, (scrollYProgressValue) => {
    if (!(scrollYProgressValue && editor)) {
      return null
    }

    return Math.floor(
      (editor.state.doc.content.size - 1) * scrollYProgressValue,
    )
  })

  useMotionValueEvent(position, 'change', (pos) => {
    if (!pos) {
      return
    }

    let parentElement = editor?.view?.domAtPos(pos)?.node?.parentElement

    while (inlineTags.has(parentElement?.tagName.toLowerCase() ?? '')) {
      parentElement = parentElement?.parentElement
    }

    const y = parentElement?.offsetTop

    if (!y) {
      return
    }

    animate(contentY, y * -1 + 144, {
      duration: 0.8,
    })
  })

  useResizeObserver({
    ref: contentRef,
    onResize: () => {
      if (contentRef.current) {
        scrollableHeight.set(contentRef.current.offsetHeight * (1 / speed))
      }
      position.set(position.get() + 0.00001)
      window.scrollTo({
        top: scrollableHeight.getPrevious() ? scrollY.get() : 0,
        behavior: 'instant',
      })
    },
  })

  const animationFrameId = useRef<number>()
  useMotionValueEvent(scrollY, 'change', () => {
    animationFrameId.current && cancelAnimationFrame(animationFrameId.current)

    animationFrameId.current = requestAnimationFrame(() => {
      if (position.get() === null) {
        animate(contentY, 0)
      }
    })
  })

  const emptyArrayOfLength = useMemo(
    () => Array.from({ length: cursorLength }),
    [],
  )

  return (
    <div className={cx(JetBrainsMono.variable)}>
      <article className="container max-w-prose">
        {post.thumbnailSrc && (
          <aside className="relative aspect-video">
            <Image
              src={post.thumbnailSrc}
              alt={`${post.title} thumbnail's blur`}
              fill
              className="absolute object-cover rounded-2xl max-w-full max-h-full blur-3xl scale-90 pointer-events-none transform-gpu"
            />
            <Image
              src={post.thumbnailSrc}
              alt={`${post.title}'s thumbnail`}
              fill
              className="object-cover rounded-2xl"
            />
          </aside>
        )}
        <header className="mt-6 mb-12">
          <hgroup className="space-y-4">
            <h1 className="text-4xl md:text-5xl text-balance font-semibold text-gray-12 tracking-tighter">
              {post.title}
            </h1>
            <p className="text-gray-10 font-medium text-xl md:text-2xl tracking-tight text-pretty">
              {post.lead}
            </p>
          </hgroup>
        </header>
        <section className="typography">
          <m.div
            className="relative w-full"
            style={{ height: scrollableHeight }}
            ref={scrollableRef}
          >
            <div className={editor ? 'sticky top-0 inset-x-0 h-0' : 'static'}>
              <m.div style={{ y: contentY }} ref={contentRef}>
                <div
                  className={cx(
                    'pointer-events-none fixed top-0 left-0 *:pointer-events-none *:fixed *:bg-gray-6',
                    !editor && 'hidden',
                  )}
                >
                  {emptyArrayOfLength.map((_, index) => (
                    <ContentFlowCursorItem
                      // biome-ignore lint/suspicious/noArrayIndexKey: I know what I'm doing
                      key={index}
                      scrollableRef={scrollableRef}
                      editor={editor}
                      contentY={contentY}
                      position={position}
                      offset={index}
                    />
                  ))}
                </div>
                <TextEditor
                  editor={editor}
                  content={content}
                  extensions={extensions}
                />
              </m.div>
            </div>
          </m.div>
        </section>
      </article>
    </div>
  )
}

const emptyStyle = {
  y: 0,
  x: 0,
  height: 0,
  width: 0,
} as const satisfies MotionStyle

function ContentFlowCursorItem({
  scrollableRef,
  editor,
  position,
  contentY,
  offset,
}: {
  scrollableRef: RefObject<HTMLElement>
  editor: Editor | null
  position: MotionValue<number | null>
  contentY: MotionValue<number | undefined>
  offset: number
}) {
  const style = useTransform(position, (pos) => {
    if (!(editor && pos && contentY.get())) {
      return emptyStyle
    }

    const computedPos = pos - offset

    try {
      const coords = editor.view.coordsAtPos(computedPos)
      const nextCoords = editor.view.coordsAtPos(computedPos + 1)

      return {
        y: coords.top - contentY.get(),
        x: coords.left - (scrollableRef.current?.offsetLeft ?? 0),
        height: coords.bottom - coords.top,
        width: nextCoords.left - coords.left + 1, // +1px to avoid gaps
      } as const satisfies MotionStyle
    } catch (error) {
      return emptyStyle
    }
  })

  const y = useTransform(style, (s) => s.y)
  const x = useTransform(style, (s) => s.x)
  const height = useTransform(style, (s) => s.height)
  const width = useTransform(style, (s) => s.width)

  return <m.i style={{ y, x, height, width }} />
}
