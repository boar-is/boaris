import { generateHTML } from '@tiptap/html'
import type { Extensions, JSONContent } from '@tiptap/react'

export function StaticEditorContent({
  content,
  extensions,
}: { content: JSONContent; extensions: Extensions }) {
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
