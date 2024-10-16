import { v } from 'convex/values'
import type { Delta as _Delta } from 'jsondiffpatch'

export const delta = v.any()

export type Delta = NonNullable<_Delta>
