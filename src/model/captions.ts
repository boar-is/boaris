import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
import type { LayoutChange } from '~/model/layoutChange'
import { Interpolation, interpolation } from './interpolation'
import { JsonContent, jsonContent } from './jsonContent'

export const captions = v.object({
  content: jsonContent,
  interpolation: interpolation,
})

export class Captions extends Schema.Class<Captions>('Captions')({
  content: JsonContent,
  interpolation: Interpolation,
}) {
  static encodedFromEntity({
    content,
    interpolation,
  }: Infer<typeof captions>): typeof Captions.Encoded {
    return {
      content,
      interpolation: Interpolation.encodedFromEntity(interpolation),
    }
  }
}

export const remappedCaptions =
  (layoutChanges: ReadonlyArray<typeof LayoutChange.Type>) =>
  (captions: typeof Captions.Type) =>
    // TODO Implement cutting skipped parts
    // TODO Implement compound interpolation
    captions

// TODO Implement interpolation
export const getCaptionsProgress =
  (interpolation: (typeof Captions.Type)['interpolation']) =>
  (playbackProgress: number) =>
    playbackProgress
