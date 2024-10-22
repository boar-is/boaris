import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import * as A from 'effect/Array'
import * as M from 'effect/Match'
import * as O from 'effect/Option'
import { AnimatePresence, transform } from 'framer-motion'
import { atom, useAtomValue } from 'jotai'
import { splitAtom } from 'jotai/utils'
import { type PropsWithChildren, useMemo, useRef } from 'react'
import { useLayoutChangesAtom } from '~/features/layout-changes-atom-context'
import {
  LayoutLayerAtomContext,
  useLayoutLayerAtom,
} from '~/features/layout-layer-atom-context'
import { matchFileTypeIcon } from '~/features/match-file-type-icon'
import { usePlaybackProgressAtom } from '~/features/playback-progress-atom-context'
import { useTracksAtom } from '~/features/tracks-atom-context'
import { codemirrorTheme } from '~/lib/codemirror/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/codemirror/match-codemirror-extensions'
import { motion } from '~/lib/framer-motion/motion'
import { Image } from '~/lib/media/image'
import { useConstant } from '~/lib/react/use-constant'
import { cx } from '~/lib/utils/cx'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import { layoutProgressInterpolationFromChanges } from '~/model/layoutChange'
import type { Track } from '~/model/track'

export function PostScrollingLayout() {
  const playbackProgressAtom = usePlaybackProgressAtom()
  const changesAtom = useLayoutChangesAtom()

  const transformInterpolationAtom = useConstant(() =>
    atom((get) => {
      const { input, output } = layoutProgressInterpolationFromChanges(
        get(changesAtom),
      )
      return transform(input as Array<number>, output as Array<number>)
    }),
  )

  const progressAtom = useConstant(() =>
    atom((get) => get(transformInterpolationAtom)(get(playbackProgressAtom))),
  )

  const indexAtom = useConstant(() =>
    atom(
      (get) =>
        findClosestIndex(get(changesAtom), get(progressAtom), (it) => it.at)!,
    ),
  )

  const layersAtom = useConstant(() =>
    atom((get) =>
      A.get(get(changesAtom), get(indexAtom)).pipe(
        O.andThen((it) => it.layers),
        O.getOrThrow,
      ),
    ),
  )

  const mainLayerAtom = useConstant(() => atom((get) => get(layersAtom).main))

  return (
    <LayoutLayerAtomContext.Provider value={mainLayerAtom}>
      <MainLayerGrid>
        <MainLayerGridItems />
      </MainLayerGrid>
    </LayoutLayerAtomContext.Provider>
  )
}

function MainLayerGrid({ children }: PropsWithChildren) {
  const layer = useAtomValue(useLayoutLayerAtom())

  return layer.pipe(
    O.andThen(({ areas, rows, columns }) => (
      <ul
        className="grid sticky bottom-4 inset-x-0 h-[60dvh] w-screen container gap-2 *:h-full"
        style={{
          gridTemplateAreas: areas,
          gridTemplateColumns: O.getOrUndefined(columns),
          gridTemplateRows: O.getOrUndefined(rows),
          gridAutoColumns: 'minmax(0, 1fr)',
          gridAutoRows: 'minmax(0, 1fr)',
        }}
      >
        {children}
      </ul>
    )),
    O.getOrNull,
  )
}

function MainLayerGridItems() {
  const layerAtom = useLayoutLayerAtom()

  const areasAtom = useConstant(() =>
    atom((get) => get(layerAtom).pipe(O.map((it) => it.areas))),
  )

  const tracksAtom = useTracksAtom()

  const currentTracksAtomsAtom = useConstant(() =>
    splitAtom(
      atom((get) =>
        get(areasAtom).pipe(
          O.map((areas) =>
            get(tracksAtom).filter((it) => areas.includes(it.id)),
          ),
          O.filter((arr) => arr.length > 0),
        ),
      ),
    ),
  )

  return (
    <AnimatePresence mode="popLayout">
      {tracks.map((track) => (
        <motion.li
          className="bg-gray-2/90 backdrop-blur-md border border-gray-4 rounded-xl overflow-hidden"
          key={track.id}
          style={{ gridArea: track.id }}
          initial={{ opacity: 0, filter: 'blur(16px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
        >
          {matchLayoutTrackPanel(track)}
        </motion.li>
      ))}
    </AnimatePresence>
  )
}

const matchLayoutTrackPanel = M.type<typeof Track.Type>().pipe(
  M.when({ type: 'image-static' }, (track) => (
    <LayoutStaticImagePanel track={track} />
  )),
  M.when({ type: 'image-dynamic' }, (track) => (
    <LayoutDynamicImagePanel track={track} />
  )),
  M.when({ type: 'text' }, (track) => <LayoutTextPanel track={track} />),
  M.exhaustive,
)

type LayoutTypedTrack<T extends LayoutTrack['type']> = Extract<
  LayoutTrack,
  { type: T }
>

function LayoutStaticImagePanel({
  track,
}: { track: LayoutTypedTrack<'static-image'> }) {
  return (
    <LayoutPanel>
      <LayoutPanelHeader name={track.name} />
      <Image
        src={track.url}
        className="object-cover blur-md"
        alt="Image's backdrop"
        fill
      />
      <section className="flex-1 relative">
        <Image
          src={track.url}
          className="object-contain"
          alt={
            track.alt ??
            track.caption ??
            'The author did not provide any alt to this image'
          }
          fill
        />
      </section>
      {track.caption && <LayoutPanelFooter>{track.caption}</LayoutPanelFooter>}
    </LayoutPanel>
  )
}

function LayoutDynamicImagePanel({
  track,
}: { track: LayoutTypedTrack<'dynamic-image'> }) {
  return (
    <LayoutPanel>
      <LayoutPanelHeader name={track.name} />
      <video
        className="absolute inset-0 size-full -z-[2] object-cover blur-lg"
        src={track.url}
        autoPlay
        playsInline
        muted
        loop
      />
      <section className="flex-1 relative flex items-center">
        <video
          className="absolute inset-0 size-full object-contain object-center"
          src={track.url}
          autoPlay
          playsInline
          muted
          loop
        />
      </section>
      {track.caption && <LayoutPanelFooter>{track.caption}</LayoutPanelFooter>}
    </LayoutPanel>
  )
}

function LayoutTextPanel({ track }: { track: LayoutTypedTrack<'text'> }) {
  const cmRef = useRef<ReactCodeMirrorRef | null>(null)

  const extensions = useMemo(
    () => matchCodemirrorExtensions(track.name),
    [track.name],
  )

  return (
    <LayoutPanel>
      <LayoutPanelHeader name={track.name} />
      <section className="flex-1 overflow-hidden">
        <ReactCodeMirror
          className={cx(
            'h-full [&_.cm-editor]:h-full [&_.cm-scroller]:[scrollbar-width:thin] [&_.cm-scroller]:!text-xs md:[&_.cm-scroller]:!text-sm [&_.cm-line]:px-4',
            '[&_.cm-scroller]:overflow-hidden',
          )}
          value={track.value + track.value + track.value}
          extensions={extensions}
          editable={false}
          theme={codemirrorTheme}
          basicSetup={{
            lineNumbers: false,
            foldGutter: false,
            highlightActiveLine: false,
          }}
          ref={cmRef}
        />
      </section>
    </LayoutPanel>
  )
}

const panelEdgeClassName = cx(
  'bg-gray-1/75 py-2 px-3.5 text-sm text-gray-11 flex items-center gap-1 z-10',
)

function LayoutPanel({ children }: PropsWithChildren) {
  return (
    <article className="flex flex-col justify-between relative h-full">
      {children}
    </article>
  )
}

function LayoutPanelHeader({ name }: { name: string }) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <header className={panelEdgeClassName}>
      <FileTypeIcon className="size-4 text-gray-9" />
      {name.split('/').pop()}
    </header>
  )
}

function LayoutPanelFooter({ children }: PropsWithChildren) {
  return <footer className={panelEdgeClassName}>{children}</footer>
}
