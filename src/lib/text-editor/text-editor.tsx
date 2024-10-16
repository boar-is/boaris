import { generateHTML } from '@tiptap/html'
import {
  type Editor,
  EditorContent,
  type Extensions,
  type JSONContent,
} from '@tiptap/react'

export type TextEditorProps = {
  editor: Editor | null
  content?: JSONContent | null | undefined
  extensions: Extensions
}

export function TextEditor({ editor, content, extensions }: TextEditorProps) {
  if (!editor) {
    if (!content) {
      return null
    }

    return (
      // Emulating TipTap layout
      <div>
        <div
          className="tiptap ProseMirror"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: It's okay here
          dangerouslySetInnerHTML={{
            __html: generateHTML(content, extensions),
          }}
        />
      </div>
    )
  }

  return <EditorContent editor={editor} />
}
