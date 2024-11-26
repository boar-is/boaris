'use client'

import { identity } from 'effect'
import { PlaybackProgressAtomContext } from '~/features/playback-progress-atom-context'
import { readableDate } from '~/lib/date/readable-date'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { Image, type ImageProps } from '~/lib/media/image'
import { useBackgroundEffect } from '~/lib/surfaces/background'
import { usePostVmAtomValue } from './page.client'

export function PostScrolling() {
  return (
    <PlaybackProgressAtomContext.Provider value={useConstAtom(0)}>
      <article className="relative flex-col items-center gap-16">
        <PostScrollingHeader />
        <div id="container">
          <div
            id="content"
            className="flex flex-col justify-center gap-8 border border-[white] border-dashed"
          >
            <div
              id="captions"
              className="overflow-hidden border border-[skyblue]"
            />
            <div
              id="layout"
              className="overflow-y-auto min-h-32 shrink-[9999] border border-[green]"
            />
          </div>
        </div>
      </article>
    </PlaybackProgressAtomContext.Provider>
  )
}

export function PostScrollingHeader() {
  const vm = usePostVmAtomValue(identity)

  const posterImageProps = {
    src: vm.posterUrl,
    sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    alt: `${vm.title}'s poster`,
  } satisfies ImageProps

  useBackgroundEffect(posterImageProps)

  return (
    <header className="w-full max-w-prose">
      <hgroup className="flex flex-col gap-6">
        <figure className="relative">
          <Image
            {...posterImageProps}
            fill
            className="rounded-2xl drop-shadow-xl"
          />
        </figure>
        <h1 className="text-4xl bg-gradient-to-tr from-fg to-muted-fg bg-clip-text text-transparent font-semibold tracking-tight text-balance">
          {vm.title}
        </h1>
        {vm.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 lg:gap-2 text-sm lg:text-base font-medium tracking-wide text-muted-fg *:my-0.5">
            {vm.tags.map((tag) => (
              <li key={tag}>
                <span className="border rounded-full px-3 py-0.5">{tag}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="text-pretty text-lg font-medium">{vm.lead}</p>
        <small className="text-muted-fg font-medium tracking-wide text-sm lg:text-base">
          {readableDate(vm.date)}
        </small>
      </hgroup>
    </header>
  )
}
