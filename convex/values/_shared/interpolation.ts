import { v } from 'convex/values'

export const interpolation = v.object({
  input: v.array(v.number()),
  output: v.array(v.number()),
})

export type Interpolation = typeof interpolation.type
