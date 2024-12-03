import type { JSONContent as TipTapJsonContent } from '@tiptap/react'
import { Schema } from 'effect'

export type JSONContent = TipTapJsonContent

export const JsonContentFromSelf = Schema.declare(
  (input: unknown): input is JSONContent => !!input,
  {
    identifier: 'JsonContentFromSelf',
    description: 'https://prosemirror.net/docs/ref/#model.Node',
  },
)

/**
 * TODO Implement checking: https://prosemirror.net/docs/ref/#model.Node.check
 */
export const JsonContentFromJson = Schema.parseJson(JsonContentFromSelf)
