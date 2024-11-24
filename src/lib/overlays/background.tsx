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

export type BackgroundImageProps = Pick<ImageProps, 'src' | 'width' | 'height'>

export type BackgroundContextValue = {
  setBackground: (imageProps: BackgroundImageProps | null) => void
}

export const [BackgroundContext, useBackgroundContext] =
  createStrictContext<BackgroundContextValue>({
    name: 'BackgroundContext',
  })

export const useBackgroundEffect = (imageProps: BackgroundImageProps) => {
  const { setBackground } = useBackgroundContext()

  useEffect(() => {
    setBackground(imageProps)
  }, [setBackground, imageProps])
}

export function BackgroundProvider({
  children,
  defaultImageProps = {
    src: '/images/icon-512.png',
    width: 128,
    height: 128,
  },
}: PropsWithChildren<{
  defaultImageProps?: BackgroundImageProps | undefined
}>) {
  const [imageProps, setImageProps] =
    useState<BackgroundImageProps>(defaultImageProps)

  const pathname = usePathname()

  const value: BackgroundContextValue = useMemo(
    () => ({
      setBackground: (it) => setImageProps(it ?? defaultImageProps),
    }),
    [defaultImageProps],
  )

  useEffect(() => {
    if (pathname) {
      setImageProps(defaultImageProps)
    }
  }, [pathname, defaultImageProps])

  const shouldReduceMotion = useReducedMotion()

  const rotateProps = {
    transition: {
      duration: 120,
      ease: 'linear',
      repeat: Number.POSITIVE_INFINITY,
    },
    className: 'absolute w-[200%] aspect-square',
  } satisfies HTMLMotionProps<'div'>

  const nextImageProps = {
    ...imageProps,
    alt: 'Background',
    fill: true,
    className: 'rounded-[50%] blur-[96px] opacity-60',
  } satisfies ImageProps

  return (
    <BackgroundContext.Provider value={value}>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
          key={`${imageProps.src}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            {...rotateProps}
            initial={{ rotate: 0 }}
            animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
            className={cx(rotateProps.className, 'top-0 right-0')}
          >
            <NextImage {...nextImageProps} />
          </motion.div>
          <motion.div
            {...rotateProps}
            initial={{ rotate: 360 }}
            animate={{ rotate: shouldReduceMotion ? 360 : 0 }}
            className={cx(
              rotateProps.className,
              'bottom-0 left-0 mix-blend-luminosity',
            )}
          >
            <NextImage {...nextImageProps} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      {children}
    </BackgroundContext.Provider>
  )
}
