'use client'

import { useResizeObserver } from '@react-aria/utils'
import { type Editor, useEditor } from '@tiptap/react'
import { Match } from 'effect'
import {
  AnimatePresence,
  type MotionStyle,
  type MotionValue,
  animate,
  m,
  transform,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  type PropsWithChildren,
  type RefObject,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useWindowSize } from 'usehooks-ts'
import { diffpatcher } from '~/src/lib/delta/diffpatcher'
import { JetBrainsMono } from '~/src/lib/fonts'
import { cx } from '~/src/lib/react/cx'

import { matchFileTypeIcon } from '~/src/lib/matchers/match-file-type-icon'
import { extensions } from '~/src/lib/tiptap/extensions'
import { TextEditor } from '~/src/primitives/text-editor'
import { ensureDefined } from '~/utils/ensure-defined'
import { ensureNonNull } from '~/utils/ensure-non-null'
import { findClosestIndex } from '~/utils/find-closest-index'
import { mapSkippedPair } from '~/utils/map-skipped-pair'

const inlineTags = new Set(['code', 'span', 'strong', 'em', 'u', 's', 'a'])

export function BlogPostClient({
  post,
  captions,
  tracks,
  layout,
  storageMap,
}: {
  post: PostDoc
  captions?: Captions | undefined
  tracks: Array<Track>
  layout?: Layout | undefined
  storageMap: Record<StorageDoc['_id'], StorageDoc['src']>
}) {
  if (!layout) {
    return null
  }

  const { width } = useWindowSize({
    debounceDelay: 250,
  })

  const [currentMode, setCurrentMode] = useState<LayoutMode>('scrolling')

  const override = layout.overrides.find(
    (it) =>
      !it.disabled &&
      it.modes.includes(currentMode) &&
      (!it?.minWidthPx || width >= it.minWidthPx),
  )

  if (!layout.primary.modes.includes(currentMode)) {
    return null
  }

  const layoutValue = override
    ? (diffpatcher.patch(layout.primary, override.delta) as LayoutValue)
    : layout.primary.value

  const transformProgress = useMemo(() => {
    const inputs: Array<number> = []
    const outputs: Array<boolean> = []
    for (const change of layoutValue.changes) {
      inputs.push(change.at)
      outputs.push(change.value.type !== 'skip')
    }
    return transform(...mapSkippedPair(inputs, outputs))
  }, [layoutValue.changes])

  const [currentProgress, setCurrentProgress] = useState(0)

  const mappedProgress = transformProgress(currentProgress)

  const contentIndex = ensureNonNull(
    findClosestIndex(layoutValue.changes, mappedProgress, (it) => it.at),
  )

  const layoutContent = useLayoutContent(layoutValue, contentIndex)

  const factor = 1 / 15
  const cursorLength = 25

  // TODO should handle undefined as well
  // TODO should consider overrides
  // TODO should consider mapping
  const content = ensureDefined(captions?.value?.content)

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
      return undefined
    }

    const relativeScrollY = scrollYValue - scrollableEl.offsetTop
    const progress = relativeScrollY / scrollableEl.offsetHeight
    return Math.max(0, Math.min(1, progress))
  })

  const position = useTransform(scrollYProgress, (scrollYProgressValue) => {
    if (!(scrollYProgressValue && editor)) {
      return undefined
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
        scrollableHeight.set(contentRef.current.offsetHeight * (1 / factor))
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
      if (position.get() === undefined) {
        animate(contentY, 0)
      }
    })
  })

  const emptyArrayOfLength = useMemo(
    () => Array.from({ length: cursorLength }),
    [],
  )

  return (
    <article className={cx(JetBrainsMono.variable, 'container')}>
      <header>
        <hgroup className="space-y-4">
          <figure className="relative aspect-video">
            {post.thumbnailId && (
              <Image
                src={ensureDefined(storageMap[post.thumbnailId])}
                alt={`${post.title}'s thumbnail`}
                fill
                className="object-cover rounded-2xl"
              />
            )}
          </figure>
          <h1 className="text-4xl md:text-5xl text-balance font-semibold text-gray-12 tracking-tighter">
            {post.title}
          </h1>
          {post.lead && (
            <p className="text-gray-10 font-medium text-xl md:text-2xl tracking-tight text-pretty">
              {post.lead}
            </p>
          )}
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
      <aside>
        {layoutContent.main && (
          <LayoutMainGrid
            tracks={tracks}
            grid={layoutContent.main}
            storageMap={storageMap}
          />
        )}
      </aside>
    </article>
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
  editor?: Editor | undefined
  position: MotionValue<number | undefined>
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

function LayoutMainGrid({
  tracks,
  grid: { areas, columns, rows },
  storageMap,
}: {
  tracks: Array<Track>
  grid: LayoutGrid
  storageMap: Record<StorageDoc['_id'], StorageDoc['src']>
}) {
  const areasSet = new Set(areas.flat())
  const filteredTracks = tracks.filter((it) => areasSet.has(it._id))
  const gridTemplateAreas = areas.map((row) => `'${row.join(' ')}'`).join(' ')
  const gridTemplateColumns = (
    columns ?? ensureDefined(areas[0]).map(() => 'minmax(0, 1fr)')
  ).join(' ')
  const gridTemplateRows = (
    rows ?? ensureDefined(areas).map(() => 'minmax(0, 1fr)')
  ).join(' ')

  return (
    <ul
      className="sticky bottom-8 grid h-[60vh] gap-2 *:*:h-full"
      style={{
        gridTemplateAreas,
        gridTemplateColumns,
        gridTemplateRows,
      }}
    >
      <AnimatePresence mode="popLayout">
        {filteredTracks.map((it) => (
          <m.li
            key={it._id}
            style={{ gridArea: it._id }}
            initial={{ opacity: 0, filter: 'blur(15px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(15px)' }}
          >
            <LayoutMainGridPanel name={it.name}>
              {Match.type<Track>().pipe(
                Match.tag('ImageTrack', (track) => {
                  const src = ensureDefined(storageMap[track.value.storageId])

                  return (
                    <>
                      <section className="overflow-hidden flex-1 relative">
                        <Image
                          src={src}
                          className="object-cover blur-md"
                          alt="Image's backdrop"
                          fill
                        />
                        <Image
                          src={src}
                          className="object-contain"
                          alt={
                            track.value.alt ??
                            track.value.caption ??
                            'The author did not provide any alt to this image'
                          }
                          fill
                        />
                      </section>
                      {track.value.caption && (
                        <footer className="bg-gray-1 rounded-b-xl py-2 px-3.5 text-sm text-gray-10 text-center text-pretty">
                          {track.value.caption}
                        </footer>
                      )}
                    </>
                  )
                }),
                Match.tag('VideoTrack', (track) => (
                  <>
                    <section className="flex-1 relative overflow-hidden">
                      <video
                        className="absolute inset-0 size-full -z-[2] object-cover blur-md"
                        src={ensureDefined(storageMap[track.value.storageId])}
                        autoPlay
                        playsInline
                        muted
                        loop
                      />
                      <video
                        className="max-h-full mx-auto"
                        src={ensureDefined(storageMap[track.value.storageId])}
                        autoPlay
                        playsInline
                        muted
                        loop
                      />
                    </section>
                    {track.value.caption && (
                      <footer className="bg-gray-1 rounded-b-xl py-2 px-3.5 text-sm text-gray-10 text-center text-pretty">
                        {track.value.caption}
                      </footer>
                    )}
                  </>
                )),
                Match.tag('TextTrack', (track) => (
                  <div>track: {track._id}</div>
                )),
                Match.exhaustive,
              )(it)}
            </LayoutMainGridPanel>
          </m.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}

function LayoutMainGridPanel({
  name,
  children,
}: PropsWithChildren & { name: string }) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <article className="bg-gray-2/75 backdrop-blur-sm backdrop-saturate-150 border border-gray-4 rounded-xl flex flex-col">
      <header className="bg-gray-1 rounded-t-xl py-2 px-3.5 text-sm text-gray-11 flex items-center gap-1">
        <FileTypeIcon className="size-4 text-gray-9" />
        {name.split('/').pop()}
      </header>
      {children}
    </article>
  )
}
