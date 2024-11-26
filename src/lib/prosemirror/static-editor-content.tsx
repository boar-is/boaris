import { generateHTML } from '@tiptap/html'
import type { Extensions, JSONContent } from '@tiptap/react'

export function StaticEditorContent({
  content,
  extensions,
  className,
}: {
  content: JSONContent
  extensions: Extensions
  className?: string | undefined
}) {
  return (
    // Emulating TipTap layout
    <div className={className}>
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
