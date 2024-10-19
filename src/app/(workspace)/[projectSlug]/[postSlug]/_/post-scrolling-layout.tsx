import { Memo } from '@legendapp/state/react'
import { useLayoutChanges$ } from '~/features/layout/layout-changes-provider'
import { useLayoutChangesIndex$ } from '~/features/layout/use-layout-changes-index'
import { useLayoutProgress$ } from '~/features/layout/use-layout-progress'
import { useLayoutProgressInterpolation$ } from '~/features/layout/use-layout-progress-interpolation'
import { usePlaybackProgress } from '~/features/playback/playback-progress-provider'

export function PostScrollingLayout() {
  const playbackProgress = usePlaybackProgress()

  const changes$ = useLayoutChanges$()

  const interpolation$ = useLayoutProgressInterpolation$(changes$)

  const progress$ = useLayoutProgress$({
    playbackProgress,
    interpolation$,
  })

  const changesIndex$ = useLayoutChangesIndex$({ changes$, progress$ })

  return (
    <div className="fixed bottom-0 inset-x-0 h-1/2 bg-gray-4 container">
      layout !<Memo>{progress$}</Memo>@ !<Memo>{changesIndex$}</Memo>@
    </div>
  )
}
