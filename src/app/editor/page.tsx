'use client'

import { type JSONContent, useEditor } from '@tiptap/react'
import { extensions } from '~/src/lib/tiptap/extensions'
import { TextEditor } from '~/src/primitives/text-editor'

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
