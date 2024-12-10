'use client'

import { Schema } from 'effect'
import { type PropsWithChildren, useMemo } from 'react'
import { createStrictContext } from '~/lib/react/create-strict-context'
import { Post } from '~/model/post'

export type PostPageContextValue = {
  post: Post
}

export const [PostPageContext, usePostPage] =
  createStrictContext<PostPageContextValue>({
    name: 'PostPageContext',
  })

export function PostPageProvider({
  children,
  postEncoded,
}: PropsWithChildren<{
  postEncoded: typeof Post.Encoded
}>) {
  const value = useMemo(
    (): PostPageContextValue => ({
      post: Schema.decodeSync(Post)(postEncoded),
    }),
    [postEncoded],
  )

  return <PostPageContext value={value}>{children}</PostPageContext>
}
