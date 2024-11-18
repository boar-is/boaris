'use client'

import { identity } from 'effect'
import type { PropsWithChildren } from 'react'
import { readableDate } from '~/lib/date/readable-date'
import { mono } from '~/lib/media/fonts/mono'
import { Image } from '~/lib/media/image'
import { cx } from '~/lib/react/cx'
import { usePostVmAtomValue } from './page.client'

export function PostReading({ children }: PropsWithChildren) {
  return (
    <article className={cx(mono.variable, 'flex flex-col gap-12 items-center')}>
      {children}
    </article>
  )
}

export function PostReadingHeader() {
  const vm = usePostVmAtomValue(identity)

  return (
    <header className="w-full max-w-prose">
      <hgroup className="flex flex-col gap-6">
        <figure className="relative">
          <Image
            src={vm.posterUrl}
            alt={`${vm.title}'s poster's blur`}
            width={1024}
            height={768}
            className="absolute rounded-2xl blur-2xl opacity-35 pointer-events-none"
          />
          <Image
            src={vm.posterUrl}
            alt={`${vm.title}'s poster`}
            width={1024}
            height={768}
            className="rounded-2xl drop-shadow-xl"
          />
        </figure>
        <h1 className="text-4xl bg-gradient-to-tr from-gray-11 to-gray-12 bg-clip-text text-transparent font-semibold tracking-tight text-balance">
          {vm.title}
        </h1>
        {vm.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 lg:gap-2 text-sm lg:text-base font-medium tracking-wide text-gray-10 *:my-0.5">
            {vm.tags.map((tag) => (
              <li key={tag}>
                <span className="border border-gray-9 rounded-full px-3 py-0.5">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-gray-11 text-pretty text-lg font-medium">
          {vm.lead}
        </p>
        <small className="text-gray-10 font-medium tracking-wide text-sm lg:text-base">
          {readableDate(vm.date)}
        </small>
      </hgroup>
    </header>
  )
}

export function PostReadingSeparator() {
  return <hr className="w-full max-w-prose border-gray-3" />
}
