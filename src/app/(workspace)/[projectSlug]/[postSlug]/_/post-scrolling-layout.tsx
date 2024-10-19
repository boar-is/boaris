import { Computed, Reactive, useObservable } from '@legendapp/state/react'
import { AnimatePresence } from 'framer-motion'
import type { CSSProperties, PropsWithChildren } from 'react'
import { useLayoutChanges$ } from '~/features/layout/layout-changes-provider'
import { useLayout$ } from '~/features/layout/use-layout'
import { useLayoutChangesIndex$ } from '~/features/layout/use-layout-changes-index'
import { useLayoutProgress$ } from '~/features/layout/use-layout-progress'
import { useLayoutProgressInterpolation$ } from '~/features/layout/use-layout-progress-interpolation'
import { usePlaybackProgress } from '~/features/playback/playback-progress-provider'
import { usePostPage } from '~/features/post/post-page-provider'
import { matchFileTypeIcon } from '~/features/track/match-file-type-icon'
import { motion } from '~/lib/framer-motion/motion'

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
    <Reactive.ul
      className="grid sticky bottom-4 inset-x-0 h-[65dvh] w-screen container gap-2 *:*:h-full"
      $style={style$}
    >
      <Computed>
        {() => (
          <AnimatePresence mode="popLayout">
            {tracks$.get(true).map((track) => (
              <motion.li
                key={track.id}
                style={{ gridArea: track.id }}
                initial={{ opacity: 0, filter: 'blur(15px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(15px)' }}
              >
                <LayoutStaticPanel name={track.name}>
                  {track.name}
                </LayoutStaticPanel>
              </motion.li>
            ))}
          </AnimatePresence>
        )}
      </Computed>
    </Reactive.ul>
  )
}

function LayoutStaticPanel({
  name,
  children,
}: PropsWithChildren & { name: string }) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <article className="bg-gray-2 border border-gray-4 rounded-xl flex flex-col">
      <header className="bg-gray-1 rounded-t-xl py-2 px-3.5 text-sm text-gray-11 flex items-center gap-1">
        <FileTypeIcon className="size-4 text-gray-9" />
        {name.split('/').pop()}
      </header>
      {children}
    </article>
  )
}
