import { type Extensions, useEditor } from '@tiptap/react'
import type { CaptionsContent } from '~/convex/values/revisions/captions/captionsContent'

export const useCaptionsEditor = (
  content: CaptionsContent,
  extensions: Extensions,
) =>
  useEditor(
    {
      editable: false,
      extensions,
      content,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
    },
    [content, extensions],
  )
