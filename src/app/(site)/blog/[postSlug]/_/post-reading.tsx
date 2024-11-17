'use client'

import type { PropsWithChildren } from 'react'
import { getMonoFontClassName } from '~/lib/media/fonts/get-mono-font-class-name'
import { Image } from '~/lib/media/image'
import { cx } from '~/lib/utils/cx'
import { usePostVm } from '../page.client'

export function PostReading({ children }: PropsWithChildren) {
  return (
    <article
      className={cx(
        getMonoFontClassName(),
        'flex flex-col gap-12 items-center',
      )}
    >
      {children}
    </article>
  )
}

export function PostReadingHeader() {
  const title = usePostVm((it) => it.title)
  const lead = usePostVm((it) => it.lead)
  const posterUrl = usePostVm((it) => it.posterUrl)
  const tags = usePostVm((it) => it.tags)
  const date = usePostVm((it) => it.date)

  return (
    <header className="w-full max-w-prose">
      <hgroup className="flex flex-col gap-6">
        <figure className="relative">
          <Image
            src={posterUrl}
            alt={`${title}'s poster's blur`}
            width={1024}
            height={768}
            className="absolute rounded-2xl blur-2xl opacity-35 pointer-events-none"
          />
          <Image
            src={posterUrl}
            alt={`${title}'s poster`}
            width={1024}
            height={768}
            className="rounded-2xl drop-shadow-xl"
          />
        </figure>
        <h1 className="text-4xl bg-gradient-to-tr from-gray-11 to-gray-12 bg-clip-text text-transparent font-semibold tracking-tight text-balance">
          {title}
        </h1>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 lg:gap-2 text-sm lg:text-base font-medium tracking-wide text-gray-10 *:my-0.5">
            {tags.map((tag) => (
              <li key={tag}>
                <span className="border border-gray-9 rounded-full px-3 py-0.5">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-gray-11 text-pretty text-lg font-medium">{lead}</p>
      </hgroup>
    </header>
  )
}

export function PostReadingSeparator() {
  return <hr className="w-full max-w-prose border-gray-3" />
}
