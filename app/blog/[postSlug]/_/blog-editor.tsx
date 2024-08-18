'use client'

import { useEditor } from '@tiptap/react'
import { TextEditor } from '~/components/text-editor'
import { typography } from '~/lib/posts/typography'
import { extensions } from '~/lib/tiptap/extensions'

const content = typography.content

export function BlogEditor() {
  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  })

  return (
    <TextEditor editor={editor} content={content} extensions={extensions} />
  )
}
