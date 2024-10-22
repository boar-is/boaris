import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import type { action } from './action'
import { TrackBase, trackBase } from './trackBase'

/**
 * @example coding files like .ts, .tsx, .etc.
 * @example plain text files
 * @example unknown file formats that would open with CodeMirror
 */
export const trackText = v.object({
  ...trackBase.fields,
  type: v.literal('text'),
  value: v.string(),
})

export class TrackText extends TrackBase.extend<TrackText>('TrackText')({
  type: S.Literal('text'),
  value: S.NonEmptyTrimmedString,
}) {
  static encodedFromEntity(actions: Array<Infer<typeof action>>) {
    return ({
      type,
      value,
      ...base
    }: Infer<typeof trackText>): typeof TrackText.Encoded => ({
      ...TrackBase.encodedFromEntity(base, actions),
      type,
      value,
    })
  }
}
