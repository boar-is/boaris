'use client'

import { type JSONContent, useEditor } from '@tiptap/react'
import { TextEditor } from '~/components/text-editor'
import { extensions } from '~/lib/tiptap/extensions'

export function BlogCaptions({ content }: { content: JSONContent }) {
  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        'data-slot': 'typography-root',
      },
    },
  })

  return (
    <TextEditor editor={editor} content={content} extensions={extensions} />
  )
}
