'use client'

import { type JSONContent, useEditor } from '@tiptap/react'
import { TextEditor } from '~/components/text-editor'
import { extensions } from '~/lib/tiptap/extensions'

const content: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [],
    },
  ],
}

export default function EditorPage() {
  const editor = useEditor(
    {
      content,
      extensions,
      immediatelyRender: false,
      autofocus: 'start',
    },
    [],
  )

  return (
    <div className="container max-w-prose typography space-y-16">
      <TextEditor editor={editor} content={content} extensions={extensions} />
      <pre className="font-mono text-sm">
        {JSON.stringify(editor?.getJSON()?.content, null, 4)}
      </pre>
    </div>
  )
}
