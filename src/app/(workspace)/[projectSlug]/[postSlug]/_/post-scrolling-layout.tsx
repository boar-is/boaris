import { Reactive, reactive, useObservable } from '@legendapp/state/react'
import ReactCodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { Match } from 'effect'
import { AnimatePresence } from 'framer-motion'
import {
  type CSSProperties,
  type PropsWithChildren,
  useMemo,
  useRef,
} from 'react'
import { useLayoutChanges$ } from '~/features/layout/layout-changes-provider'
import { useLayout$ } from '~/features/layout/use-layout'
import { useLayoutChangesIndex$ } from '~/features/layout/use-layout-changes-index'
import { useLayoutProgress$ } from '~/features/layout/use-layout-progress'
import { useLayoutProgressInterpolation$ } from '~/features/layout/use-layout-progress-interpolation'
import { usePlaybackProgress } from '~/features/playback/playback-progress-provider'
import {
  type PostPageContextValue,
  usePostPage,
} from '~/features/post/post-page-provider'
import { matchFileTypeIcon } from '~/features/track/match-file-type-icon'
import { codemirrorTheme } from '~/lib/code-editor/codemirror-theme'
import { matchCodemirrorExtensions } from '~/lib/code-editor/match-codemirror-extensions'
import { motion } from '~/lib/framer-motion/motion'
import { Image } from '~/lib/media/image'
import { cx } from '~/lib/utils/cx'

export function PostScrollingLayout() {
  const playbackProgress = usePlaybackProgress()

  const changes$ = useLayoutChanges$()

  const interpolation$ = useLayoutProgressInterpolation$(changes$)

  const progress$ = useLayoutProgress$({
    playbackProgress,
    interpolation$,
  })

  const index$ = useLayoutChangesIndex$({ changes$, progress$ })

  const layout$ = useLayout$({
    changes$,
    index$,
  })

  const style$ = useObservable((): CSSProperties => {
    const layout = layout$.get()
    return {
      gridTemplateAreas: layout?.static?.areas,
      gridTemplateColumns: layout?.static?.columns,
      gridTemplateRows: layout?.static?.rows,
      gridAutoColumns: 'minmax(0, 1fr)',
      gridAutoRows: 'minmax(0, 1fr)',
    }
  })

  const result$ = usePostPage()

  const tracks$ = useObservable(() => {
    const areas = layout$.get()?.static?.areas
    const tracks = result$.tracks.get(true)
    return tracks?.filter((it) => areas?.includes(it.id)) ?? []
  })

  return (
    <Reactive.ul
      className="grid sticky bottom-4 inset-x-0 h-[60dvh] w-screen container gap-2 *:h-full"
      $style={style$}
    >
      <LayoutStaticGrid $tracks={tracks$} />
    </Reactive.ul>
  )
}

type LayoutTracks = PostPageContextValue['tracks']

const LayoutStaticGrid = reactive(function LayoutStaticGrid({
  tracks,
}: { tracks: LayoutTracks }) {
  if (!tracks?.length) {
    return null
  }

  return (
    <AnimatePresence mode="popLayout">
      {tracks.map((track) => (
        <motion.li
          className="bg-gray-2/90 backdrop-blur-sm border border-gray-4 rounded-xl overflow-hidden"
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
})

type LayoutTrack = NonNullable<LayoutTracks>[number]

const matchLayoutTrackPanel = Match.type<LayoutTrack>().pipe(
  Match.when({ type: 'static-image' }, (track) => (
    <LayoutStaticImagePanel track={track} />
  )),
  Match.when({ type: 'dynamic-image' }, (track) => (
    <LayoutDynamicImagePanel track={track} />
  )),
  Match.when({ type: 'text' }, (track) => <LayoutTextPanel track={track} />),
  Match.exhaustive,
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
          className="h-full [&_.cm-editor]:h-full [&_.cm-scroller]:[scrollbar-width:thin] [&_.cm-scroller]:!text-xs md:[&_.cm-scroller]:!text-sm [&_.cm-line]:px-4"
          value={track.value + track.value + track.value}
          extensions={extensions}
          editable={true}
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
