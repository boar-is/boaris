import {
  type Editor,
  EditorContent,
  type Extensions,
  type JSONContent,
} from '@tiptap/react'
import { StaticTextEditor } from '~/lib/text-editor/static-text-editor'

export type TextEditorProps = {
  editor: Editor | null
  content?: JSONContent | null | undefined
  extensions: Extensions
}

export function TextEditor({ editor, content, extensions }: TextEditorProps) {
  if (!editor) {
    return content ? (
      <StaticTextEditor content={content} extensions={extensions} />
    ) : null
  }

  return <EditorContent editor={editor} />
}
