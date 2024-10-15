import { v } from 'convex/values'
import { trackBase } from './trackBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export const textTrack = v.object({
  ...trackBase.fields,
  type: v.literal('text'),
  value: v.string(),
})

export type TextTrack = typeof textTrack.type
