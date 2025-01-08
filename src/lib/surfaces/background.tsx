'use client'

import { AnimatePresence } from 'motion/react'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Image, defaultImageSizes } from '~/lib/media/image'
import { motion } from '~/lib/motion/motion'
import { createStrictContext } from '~/lib/react/create-strict-context'

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

export function BackgroundEffect(props: BackgroundImageProps | null) {
  useBackgroundEffect(props)

  return null
}

export const defaultImagePropsConst: BackgroundImageProps = {
  src: '/images/og.webp',
  sizes: defaultImageSizes,
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

  return (
    <BackgroundContext value={value}>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 -z-10 overflow-hidden pointer-events-none isolate"
          key={imageProps.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Image
            {...imageProps}
            {...(imageProps.src === defaultImageProps.src
              ? { quality: 1 }
              : {})}
            fill
            alt="Background"
            className="blur-[80px] saturate-150 scale-125 opacity-50 transform-gpu size-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {children}
    </BackgroundContext>
  )
}
