import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import type { action } from './action'
import { TrackBase, trackBase } from './trackBase'

export const trackImageStatic = v.object({
  ...trackBase.fields,
  type: v.literal('image-static'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
  alt: v.optional(v.string()),
})

export class TrackImageStatic extends TrackBase.extend<TrackImageStatic>(
  'TrackImageStatic',
)({
  type: S.Literal('image-static'),
  url: S.NonEmptyTrimmedString,
  caption: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
  alt: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return (actions: Array<Infer<typeof action>>) =>
      async ({
        type,
        storageId,
        caption,
        alt,
        ...base
      }: Infer<typeof trackImageStatic>): Promise<
        typeof TrackImageStatic.Encoded
      > => ({
        ...TrackBase.encodedFromEntity(base, actions),
        type,
        url: (await getUrl(storageId))!,
        caption,
        alt,
      })
  }
}
