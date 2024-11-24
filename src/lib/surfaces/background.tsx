'use client'

import {
  AnimatePresence,
  type HTMLMotionProps,
  useReducedMotion,
} from 'motion/react'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { type ImageProps, Image as NextImage } from '~/lib/media/image'
import { motion } from '~/lib/motion/motion'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { cx } from '~/lib/react/cx'

export type BackgroundContextValue = {
  setBackground: (url: string | null) => void
}

export const [BackgroundContext, useBackgroundContext] =
  createStrictContext<BackgroundContextValue>({
    name: 'BackgroundContext',
  })

export const useBackgroundEffect = (url: string) => {
  const { setBackground } = useBackgroundContext()

  useEffect(() => {
    setBackground(url)
  }, [setBackground, url])
}

export function BackgroundProvider({
  children,
  defaultImageUrl = '/images/icon-512.png',
}: PropsWithChildren<{
  defaultImageUrl?: string | undefined
}>) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl)

  const pathname = usePathname()

  const value: BackgroundContextValue = useMemo(
    () => ({
      setBackground: (it) => setImageUrl(it ?? defaultImageUrl),
    }),
    [defaultImageUrl],
  )

  useEffect(() => {
    if (pathname) {
      setImageUrl(defaultImageUrl)
    }
  }, [pathname, defaultImageUrl])

  const shouldReduceMotion = useReducedMotion()

  const rotateProps = {
    transition: {
      duration: 120,
      ease: 'linear',
      repeat: Number.POSITIVE_INFINITY,
    },
    className: 'absolute w-[200%] aspect-square transform-gpu',
  } satisfies HTMLMotionProps<'div'>

  const nextImageProps = {
    src: imageUrl,
    fill: true,
    alt: 'Background',
    className: 'rounded-[50%] blur-[80px] opacity-60 transform-gpu',
    sizes: '25vw',
  } satisfies ImageProps

  return (
    <BackgroundContext.Provider value={value}>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
          key={imageUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.figure
            {...rotateProps}
            initial={{ rotate: 0 }}
            animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
            className={cx(rotateProps.className, 'top-0 right-0')}
          >
            <NextImage {...nextImageProps} />
          </motion.figure>
          <motion.figure
            {...rotateProps}
            initial={{ rotate: 360 }}
            animate={{ rotate: shouldReduceMotion ? 360 : 0 }}
            className={cx(
              rotateProps.className,
              'bottom-0 left-0 mix-blend-luminosity',
            )}
          >
            <NextImage {...nextImageProps} />
          </motion.figure>
        </motion.div>
      </AnimatePresence>
      {children}
    </BackgroundContext.Provider>
  )
}
