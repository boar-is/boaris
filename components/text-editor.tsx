import { generateHTML } from '@tiptap/html'
import {
  type Editor,
  EditorContent,
  type Extensions,
  type JSONContent,
} from '@tiptap/react'

export type TextEditorProps = {
  editor: Editor | null
  content: JSONContent
  extensions: Extensions
}

export function TextEditor({ editor, content, extensions }: TextEditorProps) {
  return editor ? (
    <EditorContent editor={editor} />
  ) : (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: It's okay here
      dangerouslySetInnerHTML={{
        __html: generateHTML(content, extensions),
      }}
    />
  )
}
