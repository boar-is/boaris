import type { TextTrackAction } from './text-track-action'

export type TextTrackValue = {
  readonly content: ReadonlyArray<string>
  readonly actions: ReadonlyArray<TextTrackAction> | null
}
