'use client'

import { type JSONContent, useEditor } from '@tiptap/react'
import { TextEditor } from '~/components/text-editor'
import { extensions } from '~/lib/tiptap/extensions'

export function BlogCaptions({ content }: { content: JSONContent }) {
  const editor = useEditor({
    editable: false,
    extensions,
    content,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  })

  return (
    <TextEditor editor={editor} content={content} extensions={extensions} />
  )
}
