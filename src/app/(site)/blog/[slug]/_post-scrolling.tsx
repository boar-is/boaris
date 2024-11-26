'use client'

import { Option, identity } from 'effect'
import { PlaybackProgressAtomContext } from '~/features/playback-progress-atom-context'
import { readableDate } from '~/lib/date/readable-date'
import { useConstAtom } from '~/lib/jotai/use-const-atom'
import { Image, type ImageProps } from '~/lib/media/image'
import { matchTagIcon } from '~/lib/media/match-tag-icon'
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
    <header className="container flex flex-col justify-between lg:flex-row gap-6 lg:gap-10 p-4 lg:p-5 drop-shadow-md">
      <aside className="relative basis-[320px] w-full order-1 lg:order-none lg:aspect-auto lg:basis-2/5 lg:max-w-md">
        <Image
          {...posterImageProps}
          fill
          className="object-cover rounded-4xl lg:rounded-4xl shadow-inner"
        />
      </aside>
      <section className="flex-1 space-y-4 lg:space-y-6 lg:py-4">
        <div>
          <small className="text-accent-11 font-bold tracking-wide text-sm lg:text-lg">
            {readableDate(vm.date)}
          </small>
          <h1 className="text-4xl lg:text-5xl font-bold text-balance bg-gradient-to-b from-gray-12 to-gray-11 bg-clip-text text-transparent !leading-relaxed">
            {vm.title}
          </h1>
        </div>

        <p className="text-lg lg:text-xl font-medium tracking-wide text-pretty !leading-relaxed max-w-prose">
          {vm.lead}
        </p>

        {Option.some(vm.tags).pipe(
          Option.filter((it) => it.length > 0),
          Option.andThen((tags) => (
            <div className="flex justify-between gap-8 items-center">
              <ul className="flex flex-wrap gap-2 lg:gap-4 text-sm lg:text-base font-bold tracking-wide text-accent-11 *:my-0.5">
                {tags.map((tag) => {
                  const Icon = matchTagIcon(tag)

                  return (
                    <li key={tag}>
                      <div className="flex gap-1 lg:gap-1.5 items-center bg-accent-7/35 border border-accent-8 border-primary rounded-full px-3 py-1">
                        {Icon && <Icon className="size-4 lg:size-5" />}
                        {tag}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )),
          Option.getOrThrow,
        )}
      </section>
    </header>
  )
}
