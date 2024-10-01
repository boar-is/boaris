'use client'

import { Match } from 'effect'
import { AnimatePresence, m, transform } from 'framer-motion'
import { type PropsWithChildren, useMemo, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import {
  CssFileTypeIcon,
  DefaultFileTypeIcon,
  HtmlFileTypeIcon,
  ImageFileTypeIcon,
  JavaScriptFileTypeIcon,
  JsonFileTypeIcon,
  JsxFileTypeIcon,
  MarkdownFileTypeIcon,
  SassFileTypeIcon,
  ShellFileTypeIcon,
  TsxFileTypeIcon,
  TypeScriptFileTypeIcon,
  VideoFileTypeIcon,
  YamlFileTypeIcon,
} from '~/components/icons'
import { Image } from '~/components/image'
import { diffpatcher } from '~/lib/diffpatcher'
import { useLayoutContent } from '~/lib/hooks/use-layout-content'
import type { Track } from '~/lib/model/docs/revisions'
import type { StorageDoc } from '~/lib/model/docs/storages'
import type {
  Layout,
  LayoutGrid,
  LayoutMode,
  LayoutValue,
} from '~/lib/model/revision/layout'
import { ensureDefined, ensureNonNull } from '~/lib/utils/ensure'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import { mapSkippedPair } from '~/lib/utils/map-skipped-pair'

export function BlogPostClient({
  tracks,
  layout,
  storageMap,
}: {
  tracks: Array<Track>
  layout: Layout | undefined
  storageMap: Record<StorageDoc['_id'], StorageDoc['src']>
}) {
  if (!layout) {
    return null
  }

  const { width } = useWindowSize({
    debounceDelay: 250,
  })

  const [currentMode, setCurrentMode] = useState<LayoutMode>('scrolling')

  const override = layout.overrides?.find(
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

  return (
    <div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={currentProgress}
        onChange={(e) => setCurrentProgress(+e.target.value)}
        className="mb-16"
      />
      <div className="h-[300vh]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        dignissimos modi officiis porro sit. Ab aliquam consequatur corporis
        eligendi, facere illo libero neque nihil nulla optio provident, quia
        tempora veniam?
      </div>
      {layoutContent.main && (
        <LayoutMainGrid
          tracks={tracks}
          grid={layoutContent.main}
          storageMap={storageMap}
        />
      )}
    </div>
  )
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
      className="sticky bottom-8 container grid h-[60vh] gap-2 *:*:h-full"
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

const matchFileTypeIcon = Match.type<string>().pipe(
  Match.when(
    (it) => /\.(css)$/i.test(it),
    () => CssFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(html)$/i.test(it),
    () => HtmlFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(gif|jpeg|jpg|png|webp|svg)$/i.test(it),
    () => ImageFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(js|cjs|mjs)$/i.test(it),
    () => JavaScriptFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(json|jsonc|jsonl|.babelrc|.eslintrc)$/i.test(it),
    () => JsonFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(jsx)$/i.test(it),
    () => JsxFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(markdown|md)$/i.test(it),
    () => MarkdownFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(sass|scss)$/i.test(it),
    () => SassFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(bash|sh|zsh)$/i.test(it),
    () => ShellFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(tsx)$/i.test(it),
    () => TsxFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(ts|cts|mts)$/i.test(it),
    () => TypeScriptFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(yaml|yml)$/i.test(it),
    () => YamlFileTypeIcon,
  ),
  Match.when(
    (it) => /\.(mp4)$/i.test(it),
    () => VideoFileTypeIcon,
  ),
  Match.orElse(() => DefaultFileTypeIcon),
)

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
