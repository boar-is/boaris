'use client'

import { type Observable, ObservableHint } from '@legendapp/state'
import { useObservable } from '@legendapp/state/react'
import type { PropsWithChildren } from 'react'
import type { PostPageQueryResult } from '~/convex/queries/postPage'
import { createStrictContext } from '~/lib/react/create-strict-context'

export type PostPageContextValue = NonNullable<PostPageQueryResult>

export const [PostPageContext, usePostPage] = createStrictContext<
  Observable<PostPageContextValue>
>({
  name: 'PostPageContext',
})

export function PostPageProvider({
  children,
  result: { captions, layouts, post, authors, tags, tracks, chunks },
}: PropsWithChildren & { result: PostPageContextValue }) {
  const value$ = useObservable<PostPageContextValue>({
    captions: captions && {
      ...captions,
      content: ObservableHint.plain(captions.content),
    },
    layouts: layouts && {
      ...layouts,
      overrides: layouts.overrides?.map((override) => ({
        ...override,
        changesDelta: ObservableHint.plain(override.changesDelta),
      })),
    },
    post,
    authors,
    tags,
    tracks,
    chunks,
  })

  return (
    <PostPageContext.Provider value={value$}>
      {children}
    </PostPageContext.Provider>
  )
}
