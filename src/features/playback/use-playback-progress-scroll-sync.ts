import { useMotionValueEvent, useScroll } from 'framer-motion'
import { useRef } from 'react'
import { usePlaybackProgress$ } from '~/features/playback/playback-progress-provider'

export const usePlaybackProgressScrollSync = () => {
  const playbackProgress$ = usePlaybackProgress$()

  const target = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target })

  useMotionValueEvent(scrollYProgress, 'change', (progress) =>
    playbackProgress$.set(progress),
  )

  return [target] as const
}
