'use client'

import { observer } from '@legendapp/state/react'
import { getMonoFontClassName } from '~/lib/media/fonts/get-mono-font-class-name'
import { cx } from '~/lib/utils/cx'

export const PostScrollingContent = observer(function PostScrollingContent() {
  return (
    <article
      className={cx(
        getMonoFontClassName(),
        'container flex flex-col gap-12 items-center',
      )}
    >
      scrolling
    </article>
  )
})
