'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { defaultEditorOptions } from '~/lib/pm/default-editor-options'

export function SandboxCaptions() {
  const editor = useEditor({
    ...defaultEditorOptions,
    editable: true,
    shouldRerenderOnTransaction: true,
  })

  return (
    <div className="container grid grid-cols-2 gap-8">
      <div className="mx-auto typography w-full drop-shadow-md text-gray-12">
        <EditorContent editor={editor} />
      </div>
      <div>
        <pre>{JSON.stringify(editor?.getJSON(), null, 8)}</pre>
      </div>
    </div>
  )
}
