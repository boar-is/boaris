'use client'

import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { useEffect, useRef } from 'react'
import { usePostPage } from '~/app/(site)/blog/[slug]/provider'
import { fixScrollUpdateSafariIos } from '~/lib/dom/fix-scroll-update-safari-ios'
import { mono } from '~/lib/media/fonts/mono'
import { Image, type ImageProps, defaultImageSizes } from '~/lib/media/image'
import { BlurFade } from '~/lib/motion/blur-fade'
import { useScrollProgressEffect } from '~/lib/motion/use-scroll-progress-effect'
import { defaultEditorExtensions } from '~/lib/pm/default-editor-extensions'
import { defaultEditorOptions } from '~/lib/pm/default-editor-options'
import { setHighlightPosition } from '~/lib/pm/position-highlight'
import { StaticEditorContent } from '~/lib/pm/static-editor-content'
import { cx } from '~/lib/react/cx'
import { useContainerHeightSync } from '~/lib/react/use-container-height-sync'
import { useBackgroundEffect } from '~/lib/surfaces/background'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { PostScrollingLayout } from './_post-scrolling-layout'

const editorContentCx = cx('mx-auto typography w-full drop-shadow-md')

export function PostScrolling() {
  const { captions: content, setDocSize } = usePostPage()

  const extensions = defaultEditorExtensions

  const editor = useEditor(
    {
      ...defaultEditorOptions,
      content,
      extensions,
      onCreate: ({ editor }) => setDocSize(editor.state.doc.content.size - 1),
    },
    [content, extensions],
  )

  return (
    <article className={cx(mono.variable, 'flex flex-col gap-16')}>
      <BlurFade inView>
        <PostScrollingHeader />
      </BlurFade>
      {editor ? (
        <PostScrollingBody editor={editor} />
      ) : (
        <StaticEditorContent
          content={content}
          extensions={extensions}
          className={editorContentCx}
        />
      )}
    </article>
  )
}

export function PostScrollingHeader() {
  const { posterUrl, title, date, lead, tags } = usePostPage()

  const posterImageProps = {
    src: posterUrl,
    sizes: defaultImageSizes,
    alt: `${title}'s poster`,
  } satisfies ImageProps

  useBackgroundEffect(posterImageProps)

  return (
    <header className="container flex flex-col justify-between lg:flex-row ~gap-6/10 ~p-4/5 drop-shadow-md">
      <aside className="relative basis-[320px] w-full order-1 lg:order-none lg:aspect-auto lg:basis-2/5 lg:max-w-md">
        <Image
          {...posterImageProps}
          fill
          className="object-cover rounded-4xl shadow-inner"
          priority
        />
      </aside>
      <section className="flex-1 ~space-y-4/6 ~py-0/4">
        <div className="space-y-1">
          <small className="text-accent-11 font-bold tracking-wide ~text-sm/lg">
            {date}
          </small>
          <h1 className="~text-4xl/5xl font-bold text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-[1.1]">
            {title}
          </h1>
        </div>

        <p className="~text-lg/xl font-medium tracking-wide text-pretty !leading-relaxed max-w-prose">
          {lead}
        </p>

        {tags && (
          <div className="flex justify-between gap-8 items-center">
            <ul className="flex flex-wrap ~gap-2/4 ~text-sm/base font-bold tracking-wide text-accent-11 *:my-0.5">
              {tags.map((tag) => (
                <li key={tag.name}>
                  <div
                    className={cx(
                      shadowInsetStyles,
                      'flex ~gap-1/1.5 items-center bg-accent-7/35 border border-accent-8 rounded-full after:rounded-full px-3 py-1',
                    )}
                  >
                    {tag.Icon && <tag.Icon className="~size-4/5" />}
                    {tag.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </header>
  )
}

export function PostScrollingBody({ editor }: { editor: Editor }) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useContainerHeightSync({ contentRef })

  const { setProgress, scrollableEffect } = usePostPage()

  useScrollProgressEffect({
    targetRef: containerRef,
    onUpdate: (progress) => {
      containerRef.current?.style.height && setProgress(progress)
    },
  })

  useEffect(
    () =>
      scrollableEffect({
        scrollableElement: scrollableRef.current!,
        contentElement: contentRef.current!,
        dispatchPosition: (position) => setHighlightPosition(editor, position),
        resolvePosition: (position) => editor.state.doc.resolve(position),
        nodeDom: (position) => editor.view.nodeDOM(position),
      }),
    [scrollableEffect, editor],
  )

  // TODO still need this?
  useEffect(() => fixScrollUpdateSafariIos(), [])

  return (
    <div className="relative container" ref={containerRef}>
      <div className="sticky top-0 h-dvh flex flex-col lg:flex-row lg:*:flex-1 justify-center">
        <div
          className="flex-1 overflow-hidden fade-y-64 py-24"
          ref={scrollableRef}
        >
          <EditorContent
            editor={editor}
            className={editorContentCx}
            ref={contentRef}
          />
        </div>
        <PostScrollingLayout className="shrink basis-auto max-h-[50%] lg:max-h-[80%] lg:self-center ~pb-2/4" />
      </div>
    </div>
  )
}
