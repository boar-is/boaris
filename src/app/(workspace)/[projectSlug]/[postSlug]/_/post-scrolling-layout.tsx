import ReactCodeMirror, {
  type BasicSetupOptions,
  type ReactCodeMirrorRef,
} from '@uiw/react-codemirror'
import { Array, Match, Option } from 'effect'
import { AnimatePresence, transform } from 'framer-motion'
import { type Atom, atom, useAtomValue } from 'jotai'
import { jotai } from 'jotai-components'
import { atomEffect } from 'jotai-effect'
import { splitAtom } from 'jotai/utils'
import {
  type PropsWithChildren,
  forwardRef,
  memo,
  useMemo,
  useRef,
} from 'react'
import {
  AssetIdAtomContext,
  useAssetIdAtom,
} from '~/features/asset-id-atom-context'
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
import { reversedTextChanges, seekCodeMirrorChanges } from '~/model/assetText'
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
        className="grid gap-2 *:h-full"
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

const JotaiMotionLi = jotai.create(motion.li)

const MainLayerGridItem = memo(
  forwardRef<HTMLLIElement, { assetAtom: Atom<typeof Asset.Type> }>(
    function MainLayerGridItem({ assetAtom }, ref) {
      const idAtom = useConstant(() => atom((get) => get(assetAtom)._id))

      const styleAtom = useConstant(() =>
        atom((get) => ({ gridArea: get(idAtom) })),
      )

      const type = useAtomValue(
        useConstant(() => atom((get) => get(assetAtom).type)),
      )

      return (
        <JotaiMotionLi
          ref={ref}
          className="bg-gray-1/80 backdrop-blur-md border border-gray-4/80 rounded-xl overflow-hidden aspect-video"
          $style={styleAtom}
          initial={{ opacity: 0, filter: 'blur(16px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
        >
          <AssetIdAtomContext.Provider value={idAtom}>
            {matchLayoutAssetPanel(type)}
          </AssetIdAtomContext.Provider>
        </JotaiMotionLi>
      )
    },
  ),
)

const matchLayoutAssetPanel = Match.type<(typeof Asset.Type)['type']>().pipe(
  Match.when('image-static', () => <LayoutAssetImageStatic />),
  Match.when('image-dynamic', () => <LayoutAssetImageDynamic />),
  Match.when('text', () => <LayoutAssetText />),
  Match.exhaustive,
)

const getAssetAtomById =
  (assetsAtom: Atom<ReadonlyArray<typeof Asset.Type>>) =>
  (idAtom: Atom<(typeof Asset.Type)['_id']>) =>
  <T extends (typeof Asset.Type)['type']>(assertionType: T) =>
    atom((get) => {
      const id = get(idAtom)
      const asset = get(assetsAtom).find((it) => it._id === id)
      if (asset?.type !== assertionType) {
        throw new Error(`Impossible state deriving the asset with id ${id}`)
      }
      return asset as Extract<typeof Asset.Type, { type: T }>
    })

const LayoutAssetImageStatic = memo(function LayoutAssetImageStatic() {
  const assetsAtom = useAssetsAtom()
  const idAtom = useAssetIdAtom()

  const { name, url, alt, caption } = useAtomValue(
    useConstant(() => getAssetAtomById(assetsAtom)(idAtom)('image-static')),
  )

  return (
    <LayoutPanel>
      <LayoutPanelHeader name={name} />
      <Image
        src={url}
        className="object-cover blur-md"
        alt="Image's backdrop blur"
        fill
      />
      <section className="flex-1 relative">
        <Image
          src={url}
          className="object-contain"
          alt={alt.pipe(
            Option.orElse(() => caption),
            Option.getOrElse(
              () => 'The author did not provide any alt to this image',
            ),
          )}
          fill
        />
      </section>
      {caption.pipe(
        Option.andThen((c) => <LayoutPanelFooter>{c}</LayoutPanelFooter>),
        Option.getOrNull,
      )}
    </LayoutPanel>
  )
})

const LayoutAssetImageDynamic = memo(function LayoutAssetImageDynamic() {
  const assetsAtom = useAssetsAtom()
  const idAtom = useAssetIdAtom()

  const { name, url, caption } = useAtomValue(
    useConstant(() => getAssetAtomById(assetsAtom)(idAtom)('image-dynamic')),
  )

  return (
    <LayoutPanel>
      <LayoutPanelHeader name={name} />
      <video
        className="absolute inset-0 size-full -z-[2] object-cover blur-lg"
        src={url}
        autoPlay
        playsInline
        muted
        loop
      />
      <section className="flex-1 relative flex items-center">
        <video
          className="absolute inset-0 size-full object-contain object-center"
          src={url}
          autoPlay
          playsInline
          muted
          loop
        />
      </section>
      {caption.pipe(
        Option.andThen((c) => <LayoutPanelFooter>{c}</LayoutPanelFooter>),
        Option.getOrNull,
      )}
    </LayoutPanel>
  )
})

const LayoutAssetText = memo(function LayoutAssetText() {
  const assetsAtom = useAssetsAtom()
  const idAtom = useAssetIdAtom()
  const assetAtom = useConstant(() =>
    getAssetAtomById(assetsAtom)(idAtom)('text'),
  )

  const reversesAtom = useConstant(() =>
    atom((get) => {
      const { value, changes } = get(assetAtom)
      return reversedTextChanges(value, changes)
    }),
  )

  const { name, value } = useAtomValue(assetAtom)

  const cmRef = useRef<ReactCodeMirrorRef | null>(null)

  const progressAtom = useLayoutProgressAtom()

  const headIndexAtom = useConstant(() =>
    atom((get) =>
      findClosestIndex(
        get(assetAtom).changes,
        get(progressAtom),
        (it) => it[0],
      ),
    ),
  )
  const anchorIndexAtom = useConstant(() => atom<number | undefined>(undefined))
  useAtomValue(
    useConstant(() =>
      atomEffect((get, set) => {
        const view = cmRef.current?.view
        const state = view?.state

        const anchor = get(anchorIndexAtom)
        const head = get(headIndexAtom)

        const initialValue = get(assetAtom).value
        const advances = get(assetAtom).changes
        const reverses = get(reversesAtom)

        if (!(state && view)) {
          return
        }

        const spec = seekCodeMirrorChanges({
          currentValue: state.doc,
          initialValue,
          advances,
          reverses,
          anchor,
          head,
        })

        view.dispatch(spec)

        set(anchorIndexAtom, head)
      }),
    ),
  )

  const extensions = useMemo(() => matchCodemirrorExtensions(name), [name])

  const basicSetup: BasicSetupOptions = useConstant(() => ({
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLine: false,
  }))

  return (
    <LayoutPanel>
      <LayoutPanelHeader name={name} />
      <section className="flex-1 overflow-hidden">
        <ReactCodeMirror
          className={cx(
            'h-full [&_.cm-editor]:h-full [&_.cm-scroller]:[scrollbar-width:thin] [&_.cm-scroller]:!text-xs md:[&_.cm-scroller]:!text-sm [&_.cm-line]:px-4',
            '[&_.cm-scroller]:overflow-hidden',
          )}
          value={value.toString()}
          extensions={extensions}
          editable={false}
          theme={codemirrorTheme}
          basicSetup={basicSetup}
          ref={cmRef}
        />
      </section>
    </LayoutPanel>
  )
})

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
