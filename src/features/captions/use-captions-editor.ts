import { useEditor } from '@tiptap/react'
import type { CaptionsContent } from '~/convex/values/revisions/captions/captionsContent'
import { extensions } from '~/lib/text-editor/extensions'

export const useCaptionsEditor = (content: CaptionsContent) => {
  return useEditor(
    {
      editable: false,
      extensions,
      content,
      immediatelyRender: false,
      shouldRerenderOnTransaction: false,
    },
    [content],
  )
}
