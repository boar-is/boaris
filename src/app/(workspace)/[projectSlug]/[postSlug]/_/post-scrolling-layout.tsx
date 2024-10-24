import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import * as A from 'effect/Array'
import * as M from 'effect/Match'
import * as O from 'effect/Option'
import { AnimatePresence, transform } from 'framer-motion'
import { type Atom, atom, useAtomValue } from 'jotai'
import { splitAtom } from 'jotai/utils'
import { type PropsWithChildren, forwardRef, useMemo, useRef } from 'react'
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
import type { TrackImageDynamic } from '~/model/trackImageDynamic'
import type { TrackImageStatic } from '~/model/trackImageStatic'
import type { TrackText } from '~/model/trackText'

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
    atom((get) =>
      O.fromNullable(
        findClosestIndex(get(changesAtom), get(progressAtom), (it) => it.at),
      ),
    ),
  )

  const layersAtom = useConstant(() =>
    atom((get) =>
      get(indexAtom).pipe(
        O.andThen((index) => A.get(get(changesAtom), index)),
        O.andThen((it) => it.layers),
      ),
    ),
  )

  const mainLayerAtom = useConstant(() =>
    atom((get) => get(layersAtom).pipe(O.andThen((it) => it.main))),
  )

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
      <motion.ul
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
      </motion.ul>
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

  const currentTrackAtoms = useAtomValue(
    useConstant(() =>
      splitAtom(
        atom((get) =>
          get(areasAtom).pipe(
            O.andThen((areas) =>
              get(tracksAtom).filter((it) => areas.includes(it.id)),
            ),
            O.getOrElse(() => []),
          ),
        ),
      ),
    ),
  )

  return (
    <AnimatePresence mode="popLayout">
      {currentTrackAtoms.map((trackAtom) => (
        <MainLayerGridItem key={`${trackAtom}`} trackAtom={trackAtom} />
      ))}
    </AnimatePresence>
  )
}

const MainLayerGridItem = forwardRef<
  HTMLLIElement,
  { trackAtom: Atom<typeof Track.Type> }
>(function MainLayerGridItem({ trackAtom }, ref) {
  const track = useAtomValue(trackAtom)

  return (
    <motion.li
      ref={ref}
      className="bg-gray-1/80 backdrop-blur-md border border-gray-4/80 rounded-xl overflow-hidden"
      style={{ gridArea: track.id }}
      initial={{ opacity: 0, filter: 'blur(16px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(16px)' }}
    >
      {matchLayoutTrackPanel(track)}
    </motion.li>
  )
})

const matchLayoutTrackPanel = M.type<typeof Track.Type>().pipe(
  M.when({ type: 'image-static' }, (track) => (
    <LayoutTrackImageStatic track={track} />
  )),
  M.when({ type: 'image-dynamic' }, (track) => (
    <LayoutTrackImageDynamic track={track} />
  )),
  M.when({ type: 'text' }, (track) => <LayoutTrackText track={track} />),
  M.exhaustive,
)

function LayoutTrackImageStatic({
  track,
}: { track: typeof TrackImageStatic.Type }) {
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
          alt={track.alt.pipe(
            O.orElse(() => track.caption),
            O.getOrElse(
              () => 'The author did not provide any alt to this image',
            ),
          )}
          fill
        />
      </section>
      {track.caption.pipe(
        O.andThen((caption) => (
          <LayoutPanelFooter>{caption}</LayoutPanelFooter>
        )),
        O.getOrNull,
      )}
    </LayoutPanel>
  )
}

function LayoutTrackImageDynamic({
  track,
}: { track: typeof TrackImageDynamic.Type }) {
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
      {track.caption.pipe(
        O.andThen((caption) => (
          <LayoutPanelFooter>{caption}</LayoutPanelFooter>
        )),
        O.getOrNull,
      )}
    </LayoutPanel>
  )
}

function LayoutTrackText({ track }: { track: typeof TrackText.Type }) {
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
          value={track.value}
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
  'bg-gray-2/75 py-2 px-3.5 text-sm text-gray-10 flex items-center gap-1.5 z-10',
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
