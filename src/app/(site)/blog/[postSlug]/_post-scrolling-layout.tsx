import ReactCodeMirror, {
  type BasicSetupOptions,
  type ReactCodeMirrorRef,
} from '@uiw/react-codemirror'
import { Array, Match, Option } from 'effect'
import { type Atom, atom, useAtomValue } from 'jotai'
import { jotai } from 'jotai-components'
import { atomEffect } from 'jotai-effect'
import { splitAtom } from 'jotai/utils'
import { AnimatePresence } from 'motion/react'
import {
  type PropsWithChildren,
  forwardRef,
  memo,
  useMemo,
  useRef,
} from 'react'
import { usePostVmAtom } from '~/app/(site)/blog/[postSlug]/page.client'
import { matchFileTypeIcon } from '~/features/match-file-type-icon'
import { usePlaybackProgressAtom } from '~/features/playback-progress-atom-context'
import { codemirrorTheme } from '~/lib/codemirror/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/codemirror/match-codemirror-extensions'
import { reversedChanges } from '~/lib/codemirror/reversed-changes'
import { seekChanges } from '~/lib/codemirror/seek-changes'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { Image } from '~/lib/media/image'
import { motion } from '~/lib/motion/motion'
import { useConst } from '~/lib/react/use-const'
import { cx } from '~/lib/utils/cx'
import { findClosestIndex } from '~/lib/utils/find-closest-index'
import type { Asset } from '~/model2/asset'
import type { AssetImageDynamic } from '~/model2/assetImageDynamic'
import type { AssetImageStatic } from '~/model2/assetImageStatic'
import type { AssetText } from '~/model2/assetText'

export function PostScrollingLayout() {
  const progressAtom = usePlaybackProgressAtom()

  const changesAtom = usePostVmAtom((it) => it.layoutChanges)

  const indexAtom = useConstAtom((get) =>
    Option.fromNullable(
      findClosestIndex(get(changesAtom), get(progressAtom), (it) => it.offset),
    ),
  )

  const areasAtom = useConstAtom((get) =>
    get(indexAtom).pipe(
      Option.andThen((index) => Array.get(get(changesAtom), index)),
      Option.andThen((it) => it.areas),
    ),
  )

  const assetsAtom = usePostVmAtom((it) => it.assets)

  const currentAssetsAtoms = useAtomValue(
    useConst(() =>
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
    <LayerGrid areasAtom={areasAtom}>
      <AnimatePresence mode="popLayout">
        {currentAssetsAtoms.map((assetAtom) => (
          <MainLayerGridItem key={`${assetAtom}`} assetAtom={assetAtom} />
        ))}
      </AnimatePresence>
    </LayerGrid>
  )
}

function LayerGrid({
  children,
  areasAtom,
}: PropsWithChildren<{ areasAtom: Atom<Option.Option<string>> }>) {
  const layer = useAtomValue(areasAtom)

  return layer.pipe(
    Option.andThen((areas) => (
      <motion.ul
        className="self-start sticky top-64 grid gap-2 *:h-full"
        style={{
          gridTemplateAreas: areas,
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

const JotaiMotionLi = jotai.create(motion.li)

const matchLayoutAssetPanel = (_id: Asset['_id'], type: Asset['type']) =>
  Match.value(type).pipe(
    Match.when('image-static', () => <LayoutAssetImageStatic _id={_id} />),
    Match.when('image-dynamic', () => <LayoutAssetImageDynamic _id={_id} />),
    Match.when('text', () => <LayoutAssetText _id={_id} />),
    Match.exhaustive,
  )

const MainLayerGridItem = memo(
  forwardRef<HTMLLIElement, { assetAtom: Atom<Asset> }>(
    function MainLayerGridItem({ assetAtom }, ref) {
      const idAtom = useConstAtom((get) => get(assetAtom)._id)

      const styleAtom = useConstAtom((get) => ({ gridArea: get(idAtom) }))

      const { _id, type } = useAtomValue(assetAtom)

      return (
        <JotaiMotionLi
          ref={ref}
          className="bg-gray-1/80 backdrop-blur-md border border-gray-4/80 rounded-xl overflow-hidden aspect-video"
          $style={styleAtom}
          initial={{ opacity: 0, filter: 'blur(16px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
        >
          {matchLayoutAssetPanel(_id, type)}
        </JotaiMotionLi>
      )
    },
  ),
)

type LayoutAssetProps = {
  _id: Asset['_id']
}

const useAsset = (_id: Asset['_id']) =>
  useAtomValue(usePostVmAtom((it) => it.assets)).find((it) => it._id === _id)

const LayoutAssetImageStatic = memo(function LayoutAssetImageStatic({
  _id,
}: LayoutAssetProps) {
  const { name, href, alt, caption } = useAsset(_id) as AssetImageStatic

  return (
    <LayoutPanel>
      <LayoutPanelHeader name={name} />
      <Image
        src={href}
        className="object-cover blur-md"
        alt="Image's backdrop blur"
        fill
      />
      <section className="flex-1 relative">
        <Image
          src={href}
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

const LayoutAssetImageDynamic = memo(function LayoutAssetImageDynamic({
  _id,
}: LayoutAssetProps) {
  const { name, href, caption } = useAsset(_id) as AssetImageDynamic

  return (
    <LayoutPanel>
      <LayoutPanelHeader name={name} />
      <video
        className="absolute inset-0 size-full -z-[2] object-cover blur-lg"
        src={href}
        autoPlay
        playsInline
        muted
        loop
      />
      <section className="flex-1 relative flex items-center">
        <video
          className="absolute inset-0 size-full object-contain object-center"
          src={href}
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

const LayoutAssetText = memo(function LayoutAssetText({
  _id,
}: LayoutAssetProps) {
  const { name, initialValue, advances } = useAsset(_id) as AssetText

  const reverses = useMemo(
    () => reversedChanges(initialValue, advances),
    [initialValue, advances],
  )

  const cmRef = useRef<ReactCodeMirrorRef | null>(null)

  const progressAtom = usePlaybackProgressAtom()

  const headIndexAtom = useConstAtom((get) =>
    findClosestIndex(advances, get(progressAtom), (it) => it[0]),
  )

  const anchorIndexAtom = useConstAtom<number | undefined>(undefined)

  useAtomValue(
    useConst(() =>
      atomEffect((get, set) => {
        const view = cmRef.current?.view
        const state = view?.state

        const anchor = get(anchorIndexAtom)
        const head = get(headIndexAtom)

        if (!(state && view)) {
          return
        }

        const spec = seekChanges({
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

  const basicSetup: BasicSetupOptions = useConst(() => ({
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
          value={initialValue.toString()}
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
