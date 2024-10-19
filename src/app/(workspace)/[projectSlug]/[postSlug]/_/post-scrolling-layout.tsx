import { Reactive, reactive, useObservable } from '@legendapp/state/react'
import { Match } from 'effect'
import { AnimatePresence } from 'framer-motion'
import type { CSSProperties, PropsWithChildren } from 'react'
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
    }
  })

  const result$ = usePostPage()

  const tracks$ = useObservable(() => {
    const areas = layout$.get()?.static?.areas
    const tracks = result$.tracks.get(true)
    return tracks?.filter((it) => areas?.includes(it.id)) ?? []
  })

  return (
    <Reactive.div
      className="grid sticky bottom-4 inset-x-0 h-[60dvh] w-screen container gap-2 *:h-full"
      $style={style$}
    >
      <LayoutStaticGrid $tracks={tracks$} />
    </Reactive.div>
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
        <motion.article
          className="bg-gray-2/90 backdrop-blur-sm border border-gray-4 rounded-xl flex flex-col justify-between"
          key={track.id}
          style={{ gridArea: track.id }}
          initial={{ opacity: 0, filter: 'blur(16px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(16px)' }}
        >
          {matchLayoutTrackPanel(track)}
        </motion.article>
      ))}
    </AnimatePresence>
  )
})

const matchLayoutTrackPanel = Match.type<
  NonNullable<LayoutTracks>[number]
>().pipe(
  Match.when({ type: 'static-image' }, (track) => (
    <>
      <LayoutPanelHeader name={track.name} />
      <section className="flex-1 relative overflow-hidden">
        <Image
          src={track.url}
          className="object-cover blur-md"
          alt="Image's backdrop"
          fill
        />
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
    </>
  )),
  Match.when({ type: 'dynamic-image' }, (track) => (
    <>
      <LayoutPanelHeader name={track.name} />
      <section className="flex-1 relative overflow-hidden flex items-center">
        <video
          className="absolute inset-0 size-full -z-[2] object-cover blur-lg"
          src={track.url}
          autoPlay
          playsInline
          muted
          loop
        />
        <video
          className="max-h-full mx-auto"
          src={track.url}
          autoPlay
          playsInline
          muted
          loop
        />
      </section>
      {track.caption && <LayoutPanelFooter>{track.caption}</LayoutPanelFooter>}
    </>
  )),
  Match.when({ type: 'text' }, (track) => (
    <>
      <LayoutPanelHeader name={track.name} />
      <section className="flex-1">{track.value}</section>
    </>
  )),
  Match.exhaustive,
)

const panelEdgeClassName = cx(
  'bg-gray-1 py-2 px-3.5 text-sm text-gray-11 flex items-center gap-1',
)

function LayoutPanelHeader({ name }: { name: string }) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <header className={cx(panelEdgeClassName, 'rounded-t-xl')}>
      <FileTypeIcon className="size-4 text-gray-7" />
      {name.split('/').pop()}
    </header>
  )
}

function LayoutPanelFooter({ children }: PropsWithChildren) {
  return (
    <footer className={cx(panelEdgeClassName, 'rounded-b-xl')}>
      {children}
    </footer>
  )
}
