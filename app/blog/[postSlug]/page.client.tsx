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
import { ensureNonNull } from '~/lib/utils/ensure'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import { mapSkippedPair } from '~/lib/utils/map-skipped-pair'

export function BlogPostPlayer({
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
    <>
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={currentProgress}
        onChange={(e) => setCurrentProgress(+e.target.value)}
        className="mb-16"
      />
      {layoutContent.main && (
        <LayoutMainGrid tracks={tracks} grid={layoutContent.main} />
      )}
    </>
  )
}

function LayoutMainGrid({
  tracks,
  grid: { areas },
}: { tracks: Array<Track>; grid: LayoutGrid }) {
  const areasSet = new Set(areas.flat())
  const filteredTracks = tracks.filter((it) => areasSet.has(it._id))
  const areasVar = areas.map((row) => `'${row.join(' ')}'`).join(' ')

  return (
    <ul
      className="grid h-full gap-2"
      style={{
        gridTemplateAreas: areasVar,
      }}
    >
      <AnimatePresence mode="popLayout">
        {filteredTracks.map((it) => (
          <m.li
            key={it._id}
            className="*:h-full"
            style={{ gridArea: it._id }}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
          >
            <LayoutMainGridPanel name={it.name}>
              {Match.type<Track>().pipe(
                Match.tag('ImageTrack', (track) => (
                  <div>image: {track._id}</div>
                )),
                Match.tag('VideoTrack', (track) => (
                  <div>video: {track._id}</div>
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
    <article className="bg-gray-2/75 backdrop-blur-sm backdrop-saturate-150 border border-gray-4 rounded-xl">
      <header className="bg-gray-1 rounded-t-xl py-1.5 px-3 text-sm text-gray-11 flex items-center gap-1">
        <FileTypeIcon className="size-4 text-gray-9" />
        {name.split('/').pop()}
      </header>
      {children}
    </article>
  )
}
