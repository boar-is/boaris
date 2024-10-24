'use client'

import { Option } from 'effect'
import { useAtomValue } from 'jotai'
import type { PropsWithChildren } from 'react'
import { useAuthorsAtom } from '~/features/authors-atom-context'
import { usePostAtom } from '~/features/post-atom-context'
import { useTagsAtom } from '~/features/tags-atom-context'
import { getMonoFontClassName } from '~/lib/media/fonts/get-mono-font-class-name'
import { Image } from '~/lib/media/image'
import { cx } from '~/lib/utils/cx'
import { readableDate } from '~/lib/utils/readable-date'

export function PostReading({ children }: PropsWithChildren) {
  return (
    <article
      className={cx(
        getMonoFontClassName(),
        'container flex flex-col gap-12 items-center',
      )}
    >
      {children}
    </article>
  )
}

export function PostReadingHeader() {
  const post = useAtomValue(usePostAtom())
  const tags = useAtomValue(useTagsAtom())
  const authors = useAtomValue(useAuthorsAtom())

  return (
    <header className="w-full max-w-prose">
      <hgroup className="flex flex-col gap-6">
        {post.thumbnailUrl.pipe(
          Option.andThen((url) => (
            <figure className="relative">
              <Image
                src={url}
                alt={`${post.title}'s thumbnail's blur`}
                width={1024}
                height={768}
                className="absolute rounded-2xl blur-2xl opacity-35 pointer-events-none"
              />
              <Image
                src={url}
                alt={`${post.title}'s thumbnail`}
                width={1024}
                height={768}
                className="rounded-2xl drop-shadow-xl"
              />
            </figure>
          )),
          Option.getOrNull,
        )}
        <h1 className="text-4xl text-gray-12 font-semibold tracking-tight text-balance">
          {post.title}
        </h1>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 lg:gap-2 text-sm lg:text-base font-medium tracking-wide text-gray-10 *:my-0.5">
            {tags.map((tag) => (
              <li key={tag.slug}>
                <span className="border border-gray-9 rounded-full px-3 py-0.5">
                  {tag.name}
                </span>
              </li>
            ))}
          </ul>
        )}
        {post.lead.pipe(
          Option.andThen((lead) => (
            <p className="text-gray-11 text-pretty text-lg font-medium">
              {lead}
            </p>
          )),
          Option.getOrNull,
        )}
        <div className="flex justify-between gap-8 items-center">
          {authors.length > 0 && (
            <ul className="space-y-1 lg:space-y-2 text-gray-10 lg:text-lg font-medium tracking-tight">
              {authors.map((author) => (
                <li
                  key={author.slug}
                  className="flex items-center gap-1.5 lg:gap-2"
                >
                  {author.avatarUrl.pipe(
                    Option.andThen((url) => (
                      <aside className="relative size-8 lg:size-10 rounded-full overflow-hidden border shadow-inner">
                        <Image
                          src={url}
                          alt={`${author.name}'s avatar`}
                          width={32}
                          height={32}
                          className="size-full object-cover shadow-inner"
                        />
                      </aside>
                    )),
                    Option.getOrNull,
                  )}
                  {author.name}
                </li>
              ))}
            </ul>
          )}
          <small className="text-gray-10 font-medium tracking-wide text-sm lg:text-base">
            {readableDate(post.date)}
          </small>
        </div>
      </hgroup>
    </header>
  )
}

export function PostReadingSeparator() {
  return <hr className="w-full max-w-prose border-gray-3" />
}
