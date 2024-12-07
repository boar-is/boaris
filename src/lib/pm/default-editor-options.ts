import type { UseEditorOptions } from '@tiptap/react'
import { defaultEditorExtensions } from './default-editor-extensions'

export const defaultEditorOptions: Partial<UseEditorOptions> = {
  editable: false,
  immediatelyRender: false,
  shouldRerenderOnTransaction: false,
  extensions: defaultEditorExtensions,
}
