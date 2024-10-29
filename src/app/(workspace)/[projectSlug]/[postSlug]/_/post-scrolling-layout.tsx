import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { Array, Match, Option } from 'effect'
import { AnimatePresence, transform } from 'framer-motion'
import { type Atom, atom, useAtomValue } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { splitAtom } from 'jotai/utils'
import { type PropsWithChildren, forwardRef, useMemo, useRef } from 'react'
import { useAssetsAtom } from '~/features/assets-atom-context'
import { useLayoutAtom } from '~/features/layout-atom-context'
import {
  LayoutLayerAtomContext,
  useLayoutLayerAtom,
} from '~/features/layout-layer-atom-context'
import {
  LayoutProgressAtomContext,
  useLayoutProgressAtom,
} from '~/features/layout-progress-atom.context'
import { matchFileTypeIcon } from '~/features/match-file-type-icon'
import { usePlaybackProgressAtom } from '~/features/playback-progress-atom-context'
import { codemirrorTheme } from '~/lib/codemirror/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/codemirror/match-codemirror-extensions'
import { motion } from '~/lib/framer-motion/motion'
import { Image } from '~/lib/media/image'
import { useConstant } from '~/lib/react/use-constant'
import { cx } from '~/lib/utils/cx'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import type { Asset } from '~/model/asset'
import { layoutProgressInterpolationFromChanges } from '~/model/layoutChange'

export function PostScrollingLayout() {
  const playbackProgressAtom = usePlaybackProgressAtom()
  const layoutAtom = useLayoutAtom()

  const changesAtom = useConstant(() => atom((get) => get(layoutAtom).changes))

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
      Option.fromNullable(
        findClosestIndex(
          get(changesAtom),
          get(progressAtom),
          (it) => it.offset,
        ),
      ),
    ),
  )

  const layerAtom = useConstant(() =>
    atom((get) =>
      get(indexAtom).pipe(
        Option.andThen((index) => Array.get(get(changesAtom), index)),
        Option.andThen((it) => it.value),
      ),
    ),
  )

  return (
    <LayoutProgressAtomContext.Provider value={progressAtom}>
      <LayoutLayerAtomContext.Provider value={layerAtom}>
        <MainLayerGrid>
          <MainLayerGridItems />
        </MainLayerGrid>
      </LayoutLayerAtomContext.Provider>
    </LayoutProgressAtomContext.Provider>
  )
}

function MainLayerGrid({ children }: PropsWithChildren) {
  const layer = useAtomValue(useLayoutLayerAtom())

  return layer.pipe(
    Option.andThen(({ areas, rows, columns }) => (
      <motion.ul
        className="grid sticky bottom-4 inset-x-0 h-[60dvh] w-screen container gap-2 *:h-full"
        style={{
          gridTemplateAreas: areas,
          gridTemplateColumns: Option.getOrUndefined(columns),
          gridTemplateRows: Option.getOrUndefined(rows),
          gridAutoColumns: 'minmax(0, 1fr)',
          gridAutoRows: 'minmax(0, 1fr)',
        }}
      >
        {children}
      </motion.ul>
    )),
    Option.getOrNull,
  )
}

function MainLayerGridItems() {
  const layerAtom = useLayoutLayerAtom()

  const areasAtom = useConstant(() =>
    atom((get) => get(layerAtom).pipe(Option.map((it) => it.areas))),
  )

  const assetsAtom = useAssetsAtom()

  const currentAssetsAtoms = useAtomValue(
    useConstant(() =>
      splitAtom(
        atom((get) =>
          get(areasAtom).pipe(
            Option.andThen((areas) =>
              get(assetsAtom).filter((it) => areas.includes(it._id)),
            ),
            Option.getOrElse(() => []),
          ),
        ),
      ),
    ),
  )

  return (
    <AnimatePresence mode="popLayout">
      {currentAssetsAtoms.map((assetAtom) => (
        <MainLayerGridItem key={`${assetAtom}`} assetAtom={assetAtom} />
      ))}
    </AnimatePresence>
  )
}

const MainLayerGridItem = forwardRef<
  HTMLLIElement,
  { assetAtom: Atom<typeof Asset.Type> }
>(function MainLayerGridItem({ assetAtom }, ref) {
  const asset = useAtomValue(assetAtom)

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

const matchLayoutTrackPanel = Match.type<typeof Track.Type>().pipe(
  Match.when({ type: 'image-static' }, (track) => (
    <LayoutTrackImageStatic track={track} />
  )),
  Match.when({ type: 'image-dynamic' }, (track) => (
    <LayoutTrackImageDynamic track={track} />
  )),
  Match.when({ type: 'text' }, (track) => <LayoutTrackText track={track} />),
  Match.exhaustive,
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
            Option.orElse(() => track.caption),
            Option.getOrElse(
              () => 'The author did not provide any alt to this image',
            ),
          )}
          fill
        />
      </section>
      {track.caption.pipe(
        Option.andThen((caption) => (
          <LayoutPanelFooter>{caption}</LayoutPanelFooter>
        )),
        Option.getOrNull,
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
        Option.andThen((caption) => (
          <LayoutPanelFooter>{caption}</LayoutPanelFooter>
        )),
        Option.getOrNull,
      )}
    </LayoutPanel>
  )
}

function LayoutTrackText({ track }: { track: typeof TrackText.Type }) {
  const cmRef = useRef<ReactCodeMirrorRef | null>(null)

  const progressAtom = useLayoutProgressAtom()
  const headIndexAtom = useConstant(() =>
    atom((get) =>
      findClosestIndex(track.actions, get(progressAtom), (it) => it.offset),
    ),
  )

  const anchorIndexAtom = useConstant(() => atom<number | undefined>(undefined))

  useAtomValue(
    useConstant(() =>
      atomEffect((get, set) => {
        const state = cmRef.current?.state
        const view = cmRef.current?.view

        if (!(state && view)) {
          return
        }

        const anchor = get(anchorIndexAtom)
        const head = get(headIndexAtom)

        const changes = getCmTransactionSpecFromActions(state)(track.actions)(
          anchor,
          head,
        )

        view.dispatch({ changes })

        set(anchorIndexAtom, head)
      }),
    ),
  )

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
  'bg-gray-2/75 py-2 px-3.5 text-sm text-gray-11 flex items-center gap-1.5 z-10 tracking-wide',
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
