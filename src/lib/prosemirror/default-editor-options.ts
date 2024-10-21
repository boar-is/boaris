import type { UseEditorOptions } from '@tiptap/react'

export const defaultEditorOptions: Partial<UseEditorOptions> = {
  editable: false,
  immediatelyRender: false,
  shouldRerenderOnTransaction: false,
}
