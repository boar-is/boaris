import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import ReactCodeMirror, {
  type BasicSetupOptions,
  type ReactCodeMirrorRef,
} from '@uiw/react-codemirror'
import { Array, Match, Option, identity } from 'effect'
import { jotai } from 'jotai-components'
import { atomEffect } from 'jotai-effect'
import { type Atom, atom, useAtomValue } from 'jotai/index'
import { splitAtom } from 'jotai/utils'
import { AnimatePresence } from 'motion/react'
import {
  type PropsWithChildren,
  forwardRef,
  memo,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  PlaybackProgressAtomContext,
  usePlaybackProgressAtom,
} from '~/features/playback-progress-atom-context'
import { codemirrorTheme } from '~/lib/codemirror/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/codemirror/match-codemirror-extensions'
import { reversedChanges } from '~/lib/codemirror/reversed-changes'
import { seekChanges } from '~/lib/codemirror/seek-changes'
import { findClosestIndex } from '~/lib/collections/find-closest-index'
import { readableDate } from '~/lib/date/readable-date'
import { getCenterToScrollElemTo } from '~/lib/dom/get-center-to-scroll-elem-to'
import { AtomEffect } from '~/lib/jotai/atom-effect'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { mono } from '~/lib/media/fonts/mono'
import { Image, type ImageProps } from '~/lib/media/image'
import { matchFileTypeIcon } from '~/lib/media/match-file-type-icon'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { motion } from '~/lib/motion/motion'
import { useAtomScrollSyncEffect } from '~/lib/motion/use-atom-scroll-sync-effect'
import { defaultEditorOptions } from '~/lib/prosemirror/default-editor-options'
import { defaultEditorExtensions } from '~/lib/prosemirror/defaultEditorExtensions'
import { findBlockAncestorDepth } from '~/lib/prosemirror/find-block-ancestor-depth'
import { getPositionByProgress } from '~/lib/prosemirror/get-position-by-progress'
import { setHighlightPosition } from '~/lib/prosemirror/position-highlight'
import { StaticEditorContent } from '~/lib/prosemirror/static-editor-content'
import { cx } from '~/lib/react/cx'
import { useConst } from '~/lib/react/use-const'
import { useContainerHeightSync } from '~/lib/react/use-container-height-sync'
import { useBackgroundEffect } from '~/lib/surfaces/background'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import type { Asset } from '~/model/asset'
import type { AssetImageDynamic } from '~/model/assetImageDynamic'
import type { AssetImageStatic } from '~/model/assetImageStatic'
import type { AssetText } from '~/model/assetText'
import { usePostVmAtom, usePostVmAtomValue } from './page.client'

const editorContentCx = cx('mx-auto typography w-full drop-shadow-md')

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
      <article className={cx(mono.variable, 'flex flex-col gap-16')}>
        <BlurFade inView>
          <PostScrollingHeader />
        </BlurFade>
        {editor ? (
          <PostScrollingBody editor={editor} />
        ) : (
          <StaticEditorContent
            content={captions}
            extensions={extensions}
            className={editorContentCx}
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
            {readableDate(vm.date)}
          </small>
          <h1 className="~text-4xl/5xl font-bold text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-[1.1]">
            {vm.title}
          </h1>
        </div>

        <p className="~text-lg/xl font-medium tracking-wide text-pretty !leading-relaxed max-w-prose">
          {vm.lead}
        </p>

        {Option.some(vm.tags).pipe(
          Option.filter((it) => it.length > 0),
          Option.andThen((tags) => (
            <div className="flex justify-between gap-8 items-center">
              <ul className="flex flex-wrap ~gap-2/4 ~text-sm/base font-bold tracking-wide text-accent-11 *:my-0.5">
                {tags.map((tag) => {
                  const Icon = matchTagIcon(tag)

                  return (
                    <li key={tag}>
                      <div
                        className={cx(
                          shadowInsetStyles,
                          'flex ~gap-1/1.5 items-center bg-accent-7/35 border border-accent-8 rounded-full after:rounded-full px-3 py-1',
                        )}
                      >
                        {Icon && <Icon className="~size-4/5" />}
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

  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useContainerHeightSync({ contentRef })

  useAtomScrollSyncEffect({
    targetRef: containerRef,
    progressAtom,
  })

  const getPositionByStateProgress = getPositionByProgress(editor.state)
  const positionAtom = useConstAtom((get) =>
    getPositionByStateProgress(get(progressAtom)),
  )

  const setHighlightPositionByEditor = setHighlightPosition(editor)
  const scrollAtomEffect = useConst(() =>
    atomEffect((get) => {
      const position = get(positionAtom)

      setHighlightPositionByEditor(position)

      const scrollable = scrollableRef.current!
      if (position === 0) {
        scrollable.scrollTo({ top: 0, behavior: 'smooth' })
      }

      const $pos = editor.state.doc.resolve(position)

      const depth = findBlockAncestorDepth($pos)
      if (depth === undefined) {
        return
      }

      const element = editor.view.nodeDOM($pos.before(depth))
      if (!(element instanceof HTMLElement)) {
        return
      }

      const top =
        position === 0 ? 0 : getCenterToScrollElemTo(scrollable, element)
      scrollable.scrollTo({ top, behavior: 'smooth' })
    }),
  )

  return (
    <div className="relative container" ref={containerRef}>
      <AtomEffect value={scrollAtomEffect} />
      <div className="sticky top-0 h-dvh flex flex-col justify-center gap-1 p-1 pr-8">
        <div className="overflow-y-hidden fade-y-64 py-24" ref={scrollableRef}>
          <EditorContent
            editor={editor}
            className={editorContentCx}
            ref={contentRef}
          />
        </div>
        {/*<DevPostScrollingLayout />*/}
      </div>
    </div>
  )
}

function DevPostScrollingLayout() {
  const [height, setHeight] = useState(600)

  return (
    <div
      className="bbbbbbbasis-1/2 shrink-[9999] bg-accent-2/50 container rounded-4xl"
      style={{ height }}
    >
      <div className="fixed bottom-0 left-8">
        <input
          type="number"
          min={0}
          step={32}
          value={height}
          onChange={(e) => setHeight(+e.target.value)}
        />
      </div>
      layout
    </div>
  )
}

function PostScrollingLayout() {
  const progressAtom = usePlaybackProgressAtom()

  const inProgress = useAtomValue(
    useConstAtom((get) => {
      const progress = get(progressAtom)
      return 0 < progress && progress < 1
    }),
  )

  return (
    <AnimatePresence mode="popLayout">
      {inProgress && (
        <motion.div
          initial={{ y: 300, opacity: 0, filter: 'blur(16px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: 300, opacity: 0, filter: 'blur(16px)' }}
          className="overflow-y-hidden shrink-[9999]"
        >
          <PostScrollingLayoutBody />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PostScrollingLayoutBody() {
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
  const areas = useAtomValue(
    useConstAtom((get) => Option.getOrUndefined(get(areasAtom))),
  )

  return (
    areas && (
      <motion.ul
        className="grid gap-2 *:h-full"
        style={{
          gridTemplateAreas: areas,
          gridAutoColumns: 'minmax(0, 1fr)',
          gridAutoRows: 'minmax(0, 1fr)',
        }}
      >
        {children}
      </motion.ul>
    )
  )
}

const JotaiMotionLi = jotai.create(motion.li)

const matchLayoutAssetPanel = ({
  _id,
  type,
}: Pick<typeof Asset.Type, '_id' | 'type'>) =>
  Match.value(type).pipe(
    Match.when('image-static', () => <LayoutAssetImageStatic _id={_id} />),
    Match.when('image-dynamic', () => <LayoutAssetImageDynamic _id={_id} />),
    Match.when('text', () => <LayoutAssetText _id={_id} />),
    Match.exhaustive,
  )

const MainLayerGridItem = memo(
  forwardRef<HTMLLIElement, { assetAtom: Atom<typeof Asset.Type> }>(
    function MainLayerGridItem({ assetAtom }, ref) {
      const idAtom = useConstAtom((get) => get(assetAtom)._id)

      const styleAtom = useConstAtom((get) => ({ gridArea: get(idAtom) }))

      const { _id, type } = useAtomValue(assetAtom)

      return (
        <JotaiMotionLi
          ref={ref}
          className="bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md rounded-2xl overflow-hidden aspect-video"
          $style={styleAtom}
          initial={{ opacity: 0, filter: 'blur(16px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
        >
          {matchLayoutAssetPanel({ _id, type })}
        </JotaiMotionLi>
      )
    },
  ),
)

type LayoutAssetProps = Pick<typeof Asset.Type, '_id'>

const useAsset = (_id: (typeof Asset.Type)['_id']) =>
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
            'h-full [&_.cm-editor]:h-full [&_.cm-scroller]:[scrollbar-width:thin] [&_.cm-scroller]:!~text-xs/sm [&_.cm-line]:px-4',
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
  'bg-accent-2/80 py-2 px-3.5 text-sm flex items-center gap-1.5 z-10 tracking-wide',
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
      <FileTypeIcon className="size-4 text-gray-11" />
      {name.split('/').pop()}
    </header>
  )
}

function LayoutPanelFooter({ children }: PropsWithChildren) {
  return <footer className={panelEdgeClassName}>{children}</footer>
}
