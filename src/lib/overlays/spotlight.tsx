'use client'
import { type SpringOptions, useSpring, useTransform } from 'motion/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from '~/lib/motion/motion'
import { cx } from '~/lib/react/cx'

type SpotlightProps = {
  className?: string
  size?: number
  springOptions?: SpringOptions
}

export function Spotlight({
  className,
  size = 256,
  springOptions = { bounce: 0 },
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null)

  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`)
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`)

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement
      if (parent) {
        parent.style.position = 'relative'
        parent.style.overflow = 'hidden'
        setParentElement(parent)
      }
    }
  }, [])

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) {
        return
      }
      const { left, top } = parentElement.getBoundingClientRect()
      mouseX.set(event.clientX - left)
      mouseY.set(event.clientY - top)
    },
    [mouseX, mouseY, parentElement],
  )

  useEffect(() => {
    if (!parentElement) {
      return
    }

    parentElement.addEventListener('mousemove', handleMouseMove)
    parentElement.addEventListener('mouseenter', () => setIsHovered(true))
    parentElement.addEventListener('mouseleave', () => setIsHovered(false))

    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove)
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true))
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false))
    }
  }, [parentElement, handleMouseMove])

  return (
    <motion.div
      ref={containerRef}
      className={cx(
        'pointer-events-none absolute rounded-full bg-white/10 blur-3xl transition-opacity',
        isHovered ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{
        width: size,
        height: size,
        // @ts-expect-error @see https://github.com/motiondivision/motion/issues/2887
        left: spotlightLeft,
        // @ts-expect-error @see https://github.com/motiondivision/motion/issues/2887
        top: spotlightTop,
      }}
    />
  )
}
