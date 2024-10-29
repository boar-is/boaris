import type { JSONContent } from '@tiptap/react'
import { Schema } from 'effect'

export const JsonContentSchema = Schema.declare(
  (input: unknown): input is JSONContent => !!input,
  {
    identifier: 'JsonContentSchema',
    decode: (input: JSONContent) => input,
    encode: (input: unknown) => input,
  },
)
