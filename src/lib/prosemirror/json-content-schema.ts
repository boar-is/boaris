import type { JSONContent } from '@tiptap/react'
import { Schema } from 'effect'

export const JsonContentFromSelf = Schema.declare(
  (input: unknown): input is JSONContent => true,
)
