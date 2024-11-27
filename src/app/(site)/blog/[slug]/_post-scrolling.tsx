import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { Option, identity } from 'effect'
import { atomEffect } from 'jotai-effect'
import { useAtomValue } from 'jotai/index'
import { useRef } from 'react'
import {
  PlaybackProgressAtomContext,
  usePlaybackProgressAtom,
} from '~/features/playback-progress-atom-context'
import { readableDate } from '~/lib/date/readable-date'
import { firstNonInlineAncestor } from '~/lib/dom/first-non-inline-ancestor'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { Image, type ImageProps } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { motion } from '~/lib/motion/motion'
import { useAtomScrollSyncEffect } from '~/lib/motion/use-atom-scroll-sync-effect'
import { defaultEditorOptions } from '~/lib/prosemirror/default-editor-options'
import { defaultEditorExtensions } from '~/lib/prosemirror/defaultEditorExtensions'
import { getPositionByProgress } from '~/lib/prosemirror/get-position-by-progress'
import { StaticEditorContent } from '~/lib/prosemirror/static-editor-content'
import { useConst } from '~/lib/react/use-const'
import { useContainerHeightSync } from '~/lib/react/use-container-height-sync'
import { useBackgroundEffect } from '~/lib/surfaces/background'
import { usePostVmAtomValue } from './page.client'

export function PostScrolling() {
  const captions = usePostVmAtomValue((it) => it.captions)

  const extensions = defaultEditorExtensions

  const editor = useEditor(
    {
      ...defaultEditorOptions,
      content: captions,
      extensions,
    },
    [captions, extensions],
  )

  return (
    <PlaybackProgressAtomContext.Provider value={useConstAtom(0)}>
      <article className="flex flex-col gap-16">
        <BlurFade inView>
          <PostScrollingHeader />
        </BlurFade>
        {editor ? (
          <PostScrollingBody editor={editor} />
        ) : (
          <StaticEditorContent
            content={captions}
            extensions={extensions}
            className="mx-auto typography w-full"
          />
        )}
      </article>
    </PlaybackProgressAtomContext.Provider>
  )
}

export function PostScrollingHeader() {
  const vm = usePostVmAtomValue(identity)

  const posterImageProps = {
    src: vm.posterUrl,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    alt: `${vm.title}'s poster`,
  } satisfies ImageProps

  useBackgroundEffect(posterImageProps)

  return (
    <header className="container flex flex-col justify-between lg:flex-row gap-6 lg:gap-10 p-4 lg:p-5 drop-shadow-md">
      <aside className="relative basis-[320px] w-full order-1 lg:order-none lg:aspect-auto lg:basis-2/5 lg:max-w-md">
        <Image
          {...posterImageProps}
          fill
          className="object-cover rounded-4xl lg:rounded-4xl shadow-inner"
          priority
        />
      </aside>
      <section className="flex-1 space-y-4 lg:space-y-6 lg:py-4">
        <div className="space-y-1">
          <small className="text-accent-11 font-bold tracking-wide text-sm lg:text-lg">
            {readableDate(vm.date)}
          </small>
          <h1 className="text-4xl lg:text-5xl font-bold text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-[1.1]">
            {vm.title}
          </h1>
        </div>

        <p className="text-lg lg:text-xl font-medium tracking-wide text-pretty !leading-relaxed max-w-prose">
          {vm.lead}
        </p>

        {Option.some(vm.tags).pipe(
          Option.filter((it) => it.length > 0),
          Option.andThen((tags) => (
            <div className="flex justify-between gap-8 items-center">
              <ul className="flex flex-wrap gap-2 lg:gap-4 text-sm lg:text-base font-bold tracking-wide text-accent-11 *:my-0.5">
                {tags.map((tag) => {
                  const Icon = matchTagIcon(tag)

                  return (
                    <li key={tag}>
                      <div className="flex gap-1 lg:gap-1.5 items-center bg-accent-7/35 border border-accent-8 border-primary rounded-full px-3 py-1">
                        {Icon && <Icon className="size-4 lg:size-5" />}
                        {tag}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )),
          Option.getOrThrow,
        )}
      </section>
    </header>
  )
}

export function PostScrollingBody({ editor }: { editor: Editor }) {
  const progressAtom = usePlaybackProgressAtom()

  const getPositionByStateProgress = getPositionByProgress(editor.state)
  const positionAtom = useConstAtom((get) =>
    getPositionByStateProgress(get(progressAtom)),
  )

  const contentRef = useRef<HTMLDivElement | null>(null)

  const containerRef = useContainerHeightSync({ contentRef })

  useAtomScrollSyncEffect({
    targetRef: containerRef,
    progressAtom,
  })

  const elementAtPosAtom = useConstAtom((get) => {
    const position = get(positionAtom)
    return firstNonInlineAncestor(editor.view.domAtPos(position).node)!
  })

  useAtomValue(
    useConst(() =>
      atomEffect((get) => {
        const elementAtPos = get(elementAtPosAtom)

        if (
          !elementAtPos.classList.contains('ProseMirror') &&
          !elementAtPos.classList.contains('typography')
        ) {
          const scrollable = contentRef.current!

          const scrollableRect = scrollable.getBoundingClientRect()
          const elementRect = elementAtPos.getBoundingClientRect()

          const top =
            scrollable.scrollTop +
            (elementRect.top - scrollableRect.top) -
            scrollable.clientHeight / 2 +
            elementRect.height / 2

          scrollable.scrollTo({ top, behavior: 'smooth' })
        }
      }),
    ),
  )

  return (
    <div className="relative container" ref={containerRef}>
      <div className="sticky top-0 h-dvh flex flex-col justify-center gap-1 border border-[white] border-dashed p-1 pr-8">
        <motion.div
          className="border border-[blue] overflow-y-hidden"
          ref={contentRef}
        >
          <EditorContent editor={editor} className="typography" />
        </motion.div>
        <div
          id="layout"
          className="overflow-y-auto min-h-64 shrink-[9999] border border-[green]"
        >
          <div className="bg-accent-1 rounded-lg font-mono">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cumque
            harum, id, impedit in inventore itaque labore libero molestias
            necessitatibus omnis provident quibusdam quis sint soluta tempore
            vero, vitae voluptatibus. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Ab accusamus at commodi dignissimos, earum illo
            incidunt magnam non, odit provident quaerat qui quia, repellat
            reprehenderit sapiente suscipit temporibus unde? Quae? Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Culpa harum ipsam iure
            non obcaecati. Ad beatae blanditiis, consectetur consequatur ducimus
            et laboriosam maxime minima, nemo optio rerum saepe sapiente ut?
          </div>
        </div>
      </div>
    </div>
  )
}
