'use client'

import {
  AnimatePresence,
  type HTMLMotionProps,
  useReducedMotion,
} from 'motion/react'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Image, type ImageProps } from '~/lib/media/image'
import { motion } from '~/lib/motion/motion'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { cx } from '~/lib/react/cx'

export type BackgroundImageProps = {
  src: string
  sizes: string
}

export type BackgroundContextValue = {
  setBackground: (props: BackgroundImageProps | null) => void
}

export const [BackgroundContext, useBackgroundContext] =
  createStrictContext<BackgroundContextValue>({
    name: 'BackgroundContext',
  })

export const useBackgroundEffect = (props: BackgroundImageProps | null) => {
  const { setBackground } = useBackgroundContext()

  useEffect(() => {
    setTimeout(() => {
      setBackground(props)
    })
  }, [setBackground, props])
}

export const defaultImagePropsConst: BackgroundImageProps = {
  src: '/images/icon-512.png',
  sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
} as const

export function BackgroundProvider({
  children,
  defaultImageProps = defaultImagePropsConst,
}: PropsWithChildren<{
  defaultImageProps?: BackgroundImageProps | undefined
}>) {
  const [imageProps, setImageProps] = useState(defaultImageProps)

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
      duration: 90,
      ease: 'linear',
      repeat: Number.POSITIVE_INFINITY,
    },
    className: 'absolute w-[200%] aspect-square transform-gpu',
  } satisfies HTMLMotionProps<'div'>

  const nextImageProps = {
    ...imageProps,
    fill: true,
    alt: 'Background',
    className: 'rounded-[50%] blur-[80px] opacity-35 transform-gpu',
  } satisfies ImageProps

  return (
    <BackgroundContext.Provider value={value}>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
          key={imageProps.src}
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
            <Image {...nextImageProps} />
          </motion.figure>
          <motion.figure
            {...rotateProps}
            initial={{ rotate: 360 }}
            animate={{ rotate: shouldReduceMotion ? 360 : 0 }}
            className={cx(rotateProps.className, 'bottom-0 left-0')}
          >
            <Image {...nextImageProps} />
          </motion.figure>
        </motion.div>
      </AnimatePresence>
      {children}
    </BackgroundContext.Provider>
  )
}
