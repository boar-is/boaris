'use client'

import { type Editor, EditorContent, useEditor } from '@tiptap/react'
import { useEffect, useRef } from 'react'
import { usePostPage } from '~/app/(site)/blog/[slug]/provider'
import { fixScrollUpdateSafariIos } from '~/lib/dom/fix-scroll-update-safari-ios'
import { mono } from '~/lib/media/fonts/mono'
import { Image, type ImageProps } from '~/lib/media/image'
import { BlurFade } from '~/lib/motion/blur-fade'
import { useScrollProgressEffect } from '~/lib/motion/use-scroll-progress-effect'
import { defaultEditorOptions } from '~/lib/pm/default-editor-options'
import { defaultEditorExtensions } from '~/lib/pm/defaultEditorExtensions'
import { setHighlightPosition } from '~/lib/pm/position-highlight'
import { StaticEditorContent } from '~/lib/pm/static-editor-content'
import { cx } from '~/lib/react/cx'
import { useContainerHeightSync } from '~/lib/react/use-container-height-sync'
import { useBackgroundEffect } from '~/lib/surfaces/background'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'

const editorContentCx = cx('mx-auto typography w-full drop-shadow-md')

export function PostScrolling() {
  const { captions: content, setDocSize } = usePostPage()

  const extensions = defaultEditorExtensions

  const editor = useEditor(
    {
      ...defaultEditorOptions,
      content,
      extensions,
      onCreate: ({ editor }) => {
        setDocSize(editor.state.doc.content.size - 1)
      },
    },
    [content, extensions],
  )

  return (
    <article className={cx(mono.variable, 'flex flex-col gap-16')}>
      <BlurFade inView>
        <PostScrollingHeader />
      </BlurFade>
      {editor ? (
        <PostScrollingBody editor={editor} />
      ) : (
        <StaticEditorContent
          content={content}
          extensions={extensions}
          className={editorContentCx}
        />
      )}
    </article>
  )
}

export function PostScrollingHeader() {
  const { posterUrl, title, date, lead, tags } = usePostPage()

  const posterImageProps = {
    src: posterUrl,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    alt: `${title}'s poster`,
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
            {date}
          </small>
          <h1 className="~text-4xl/5xl font-bold text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-[1.1]">
            {title}
          </h1>
        </div>

        <p className="~text-lg/xl font-medium tracking-wide text-pretty !leading-relaxed max-w-prose">
          {lead}
        </p>

        {tags && (
          <div className="flex justify-between gap-8 items-center">
            <ul className="flex flex-wrap ~gap-2/4 ~text-sm/base font-bold tracking-wide text-accent-11 *:my-0.5">
              {tags.map((tag) => (
                <li key={tag.name}>
                  <div
                    className={cx(
                      shadowInsetStyles,
                      'flex ~gap-1/1.5 items-center bg-accent-7/35 border border-accent-8 rounded-full after:rounded-full px-3 py-1',
                    )}
                  >
                    {tag.Icon && <tag.Icon className="~size-4/5" />}
                    {tag.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </header>
  )
}

export function PostScrollingBody({ editor }: { editor: Editor }) {
  const scrollableRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useContainerHeightSync({ contentRef })

  const { setProgress, scrollableEffect } = usePostPage()

  useScrollProgressEffect({
    targetRef: containerRef,
    onUpdate: setProgress,
  })

  useEffect(
    () =>
      scrollableEffect({
        element: scrollableRef.current!,
        dispatchPosition: (position) => setHighlightPosition(editor, position),
        resolvePosition: (position) => editor.state.doc.resolve(position),
        nodeDom: (position) => editor.view.nodeDOM(position),
      }),
    [scrollableEffect, editor],
  )

  useEffect(() => fixScrollUpdateSafariIos(), [])

  return (
    <div className="relative container" ref={containerRef}>
      <div className="sticky top-0 h-dvh flex flex-col justify-center gap-1 p-1 pr-8">
        <div
          className="flex-1 overflow-y-hidden fade-y-64 py-24"
          ref={scrollableRef}
        >
          <EditorContent
            editor={editor}
            className={editorContentCx}
            ref={contentRef}
          />
        </div>
        {/*<PostScrollingLayout className="shrink basis-auto max-h-[50%] container" />*/}
      </div>
    </div>
  )
}

// function PostScrollingLayoutttt() {
//   const progressAtom = usePlaybackProgressAtom()
//
//   const inProgress = useAtomValue(
//     useConstAtom((get) => {
//       const progress = get(progressAtom)
//       return 0 < progress && progress < 1
//     }),
//   )
//
//   return (
//     <AnimatePresence mode="popLayout">
//       {inProgress && (
//         <motion.div
//           initial={{ y: 300, opacity: 0, filter: 'blur(16px)' }}
//           animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
//           exit={{ y: 300, opacity: 0, filter: 'blur(16px)' }}
//           className="overflow-y-hidden shrink-[9999]"
//         >
//           <PostScrollingLayoutBody />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// function PostScrollingLayoutBody() {
//   const progressAtom = usePlaybackProgressAtom()
//
//   const changesAtom = usePostVmAtom((it) => it.layoutChanges)
//
//   const indexAtom = useConstAtom((get) =>
//     Option.fromNullable(
//       findClosestIndex(get(changesAtom), get(progressAtom), (it) => it.offset),
//     ),
//   )
//
//   const areasAtom = useConstAtom((get) =>
//     get(indexAtom).pipe(
//       Option.andThen((index) => Array.get(get(changesAtom), index)),
//       Option.andThen((it) => it.areas),
//     ),
//   )
//
//   const assetsAtom = usePostVmAtom((it) => it.assets)
//
//   const currentAssetsAtoms = useAtomValue(
//     useConst(() =>
//       splitAtom(
//         atom((get) =>
//           get(areasAtom).pipe(
//             Option.andThen((areas) =>
//               get(assetsAtom).filter((it) => areas.includes(it._id)),
//             ),
//             Option.getOrElse(() => []),
//           ),
//         ),
//       ),
//     ),
//   )
//
//   return (
//     <LayerGrid areasAtom={areasAtom}>
//       <AnimatePresence mode="popLayout">
//         {currentAssetsAtoms.map((assetAtom) => (
//           <MainLayerGridItem key={`${assetAtom}`} assetAtom={assetAtom} />
//         ))}
//       </AnimatePresence>
//     </LayerGrid>
//   )
// }

// function LayerGrid({
//   children,
//   areasAtom,
// }: PropsWithChildren<{ areasAtom: Atom<Option.Option<string>> }>) {
//   const areas = useAtomValue(
//     useConstAtom((get) => Option.getOrUndefined(get(areasAtom))),
//   )
//
//   return (
//     areas && (
//       <motion.ul
//         className="grid gap-2 *:h-full"
//         style={{
//           gridTemplateAreas: areas,
//           gridAutoColumns: 'minmax(0, 1fr)',
//           gridAutoRows: 'minmax(0, 1fr)',
//         }}
//       >
//         {children}
//       </motion.ul>
//     )
//   )
// }

// const JotaiMotionLi = jotai.create(motion.li)

// const matchLayoutAssetPanel = ({
//   _id,
//   type,
// }: Pick<typeof Asset.Type, '_id' | 'type'>) =>
//   Match.value(type).pipe(
//     Match.when('image-static', () => <LayoutAssetImageStatic _id={_id} />),
//     Match.when('image-dynamic', () => <LayoutAssetImageDynamic _id={_id} />),
//     Match.when('text', () => <LayoutAssetText _id={_id} />),
//     Match.exhaustive,
//   )

// const MainLayerGridItem = memo(
//   forwardRef<HTMLLIElement, { assetAtom: Atom<typeof Asset.Type> }>(
//     function MainLayerGridItem({ assetAtom }, ref) {
//       const idAtom = useConstAtom((get) => get(assetAtom)._id)
//
//       const styleAtom = useConstAtom((get) => ({ gridArea: get(idAtom) }))
//
//       const { _id, type } = useAtomValue(assetAtom)
//
//       return (
//         <JotaiMotionLi
//           ref={ref}
//           className="bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md rounded-2xl overflow-hidden aspect-video"
//           $style={styleAtom}
//           initial={{ opacity: 0, filter: 'blur(16px)' }}
//           animate={{ opacity: 1, filter: 'blur(0px)' }}
//           exit={{ opacity: 0, filter: 'blur(16px)' }}
//         >
//           {matchLayoutAssetPanel({ _id, type })}
//         </JotaiMotionLi>
//       )
//     },
//   ),
// )

// type LayoutAssetProps = Pick<typeof Asset.Type, '_id'>

// const useAsset = (_id: (typeof Asset.Type)['_id']) =>
//   useAtomValue(usePostVmAtom((it) => it.assets)).find((it) => it._id === _id)

// const LayoutAssetImageStatic = memo(function LayoutAssetImageStatic({
//   _id,
// }: LayoutAssetProps) {
//   const { name, href, alt, caption } = useAsset(_id) as AssetImageStatic
//
//   return (
//     <LayoutPanel>
//       <LayoutPanelHeader name={name} />
//       <Image
//         src={href}
//         className="object-cover blur-md"
//         alt="Image's backdrop blur"
//         fill
//       />
//       <section className="flex-1 relative">
//         <Image
//           src={href}
//           className="object-contain"
//           alt={alt.pipe(
//             Option.orElse(() => caption),
//             Option.getOrElse(
//               () => 'The author did not provide any alt to this image',
//             ),
//           )}
//           fill
//         />
//       </section>
//       {caption.pipe(
//         Option.andThen((c) => <LayoutPanelFooter>{c}</LayoutPanelFooter>),
//         Option.getOrNull,
//       )}
//     </LayoutPanel>
//   )
// })

// const LayoutAssetImageDynamic = memo(function LayoutAssetImageDynamic({
//   _id,
// }: LayoutAssetProps) {
//   const { name, href, caption } = useAsset(_id) as AssetImageDynamic
//
//   return (
//     <LayoutPanel>
//       <LayoutPanelHeader name={name} />
//       <video
//         className="absolute inset-0 size-full -z-[2] object-cover blur-lg"
//         src={href}
//         autoPlay
//         playsInline
//         muted
//         loop
//       />
//       <section className="flex-1 relative flex items-center">
//         <video
//           className="absolute inset-0 size-full object-contain object-center"
//           src={href}
//           autoPlay
//           playsInline
//           muted
//           loop
//         />
//       </section>
//       {caption.pipe(
//         Option.andThen((c) => <LayoutPanelFooter>{c}</LayoutPanelFooter>),
//         Option.getOrNull,
//       )}
//     </LayoutPanel>
//   )
// })

// const LayoutAssetText = memo(function LayoutAssetText({
//   _id,
// }: LayoutAssetProps) {
//   const { name, initialValue, advances } = useAsset(_id) as AssetText
//
//   const reverses = useMemo(
//     () => reversedChanges(initialValue, advances),
//     [initialValue, advances],
//   )
//
//   const cmRef = useRef<ReactCodeMirrorRef | null>(null)
//
//   const progressAtom = usePlaybackProgressAtom()
//
//   const headIndexAtom = useConstAtom((get) =>
//     findClosestIndex(advances, get(progressAtom), (it) => it[0]),
//   )
//
//   const anchorIndexAtom = useConstAtom<number | undefined>(undefined)
//
//   useAtomValue(
//     useConst(() =>
//       atomEffect((get, set) => {
//         const view = cmRef.current?.view
//         const state = view?.state
//
//         const anchor = get(anchorIndexAtom)
//         const head = get(headIndexAtom)
//
//         if (!(state && view)) {
//           return
//         }
//
//         const spec = seekChanges({
//           currentValue: state.doc,
//           initialValue,
//           advances,
//           reverses,
//           anchor,
//           head,
//         })
//
//         view.dispatch(spec)
//
//         set(anchorIndexAtom, head)
//       }),
//     ),
//   )
//
//   const extensions = useMemo(() => matchCodemirrorExtensions(name), [name])
//
//   const basicSetup: BasicSetupOptions = useConst(() => ({
//     lineNumbers: false,
//     foldGutter: false,
//     highlightActiveLine: false,
//   }))
//
//   return (
//     <LayoutPanel>
//       <LayoutPanelHeader name={name} />
//       <section className="flex-1 overflow-hidden">
//         <ReactCodeMirror
//           className={cx(
//             'h-full [&_.cm-editor]:h-full [&_.cm-scroller]:[scrollbar-width:thin] [&_.cm-scroller]:!~text-xs/sm [&_.cm-line]:px-4',
//             '[&_.cm-scroller]:overflow-hidden',
//           )}
//           value={initialValue.toString()}
//           extensions={extensions}
//           editable={false}
//           theme={codemirrorTheme}
//           basicSetup={basicSetup}
//           ref={cmRef}
//         />
//       </section>
//     </LayoutPanel>
//   )
// })

// const panelEdgeClassName = cx(
//   'bg-accent-2/80 py-2 px-3.5 text-sm flex items-center gap-1.5 z-10 tracking-wide',
// )

// function LayoutPanel({ children }: PropsWithChildren) {
//   return (
//     <article className="flex flex-col justify-between relative h-full">
//       {children}
//     </article>
//   )
// }

// function LayoutPanelHeader({ name }: { name: string }) {
//   const FileTypeIcon = matchFileTypeIcon(name)
//
//   return (
//     <header className={panelEdgeClassName}>
//       <FileTypeIcon className="size-4 text-gray-11" />
//       {name.split('/').pop()}
//     </header>
//   )
// }

// function LayoutPanelFooter({ children }: PropsWithChildren) {
//   return <footer className={panelEdgeClassName}>{children}</footer>
// }
