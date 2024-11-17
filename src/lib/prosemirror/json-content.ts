import type { JSONContent } from '@tiptap/react'
import { Schema } from 'effect'

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
