import { For, Memo } from '@legendapp/state/react'
import { usePostPageContext } from '~/features/post/post-page-provider'
import { Image } from '~/lib/media/image'
import { Show } from '~/lib/react/show'

export function PostReadingHeader() {
  const result$ = usePostPageContext()

  return (
    <header className="w-full max-w-prose">
      <hgroup className="flex flex-col gap-6">
        <Show if={result$.post.thumbnailUrl}>
          {(thumbnailUrl) => (
            <figure className="relative">
              <Image
                src={thumbnailUrl}
                alt={`${result$.post.title.get()}'s thumbnail's blur`}
                width={1024}
                height={768}
                className="absolute rounded-2xl blur-2xl opacity-35 pointer-events-none"
              />
              <Image
                src={thumbnailUrl}
                alt={`${result$.post.title.get()}'s thumbnail`}
                width={1024}
                height={768}
                className="rounded-2xl drop-shadow-xl"
              />
            </figure>
          )}
        </Show>
        <h1 className="text-4xl text-gray-12 font-semibold tracking-tight text-balance">
          <Memo>{result$.post.title}</Memo>
        </h1>
        <Show ifReady={result$.tags}>
          {() => (
            <ul className="flex flex-wrap gap-1.5 lg:gap-2 text-sm lg:text-base font-medium tracking-wide text-gray-10 *:my-0.5">
              <For each={result$.tags} optimized>
                {(tag$) => (
                  <li key={tag$.slug.get()}>
                    <span className="border border-gray-9 rounded-full px-3 py-0.5">
                      {tag$.name.get()}
                    </span>
                  </li>
                )}
              </For>
            </ul>
          )}
        </Show>
        <Show if={result$.post.lead}>
          {(lead) => (
            <p className="text-gray-11 text-pretty text-lg font-medium">
              {lead}
            </p>
          )}
        </Show>
        <div className="flex justify-between gap-8 items-center">
          <Show ifReady={result$.authors}>
            {() => (
              <ul className="space-y-1 lg:space-y-2 text-gray-10 lg:text-lg font-medium tracking-tight">
                <For each={result$.authors} optimized>
                  {(author$) => (
                    <li
                      key={author$.slug.get()}
                      className="flex items-center gap-1.5 lg:gap-2"
                    >
                      <Show if={author$.avatarUrl}>
                        {(avatarUrl) => (
                          <aside className="relative size-8 lg:size-10 rounded-full overflow-hidden border shadow-inner">
                            <Image
                              src={avatarUrl}
                              alt={`${author$.name.get()}'s avatar`}
                              width={32}
                              height={32}
                              className="size-full object-cover shadow-inner"
                            />
                          </aside>
                        )}
                      </Show>
                      {author$.name.get()}
                    </li>
                  )}
                </For>
              </ul>
            )}
          </Show>
          <small className="text-gray-10 font-medium tracking-wide text-sm lg:text-base">
            <Memo>{result$.post.date}</Memo>
          </small>
        </div>
      </hgroup>
    </header>
  )
}
