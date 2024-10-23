import { type Infer, v } from 'convex/values'
import * as S from 'effect/Schema'
import type { PropsWithGetUrl } from '~/lib/utils/props-with-get-url'
import type { action } from './action'
import { TrackBase, trackBase } from './trackBase'

export const trackImageDynamic = v.object({
  ...trackBase.fields,
  type: v.literal('image-dynamic'),
  storageId: v.id('_storage'),
  caption: v.optional(v.string()),
})

export class TrackImageDynamic extends TrackBase.extend<TrackImageDynamic>(
  'TrackImageDynamic',
)({
  type: S.Literal('image-dynamic'),
  url: S.NonEmptyTrimmedString,
  caption: S.OptionFromUndefinedOr(S.NonEmptyTrimmedString),
}) {
  static encodedFromEntity({ getUrl }: PropsWithGetUrl) {
    return (actions: Array<Infer<typeof action>>) =>
      async ({
        type,
        storageId,
        caption,
        ...base
      }: Infer<typeof trackImageDynamic>): Promise<
        typeof TrackImageDynamic.Encoded
      > => ({
        ...TrackBase.encodedFromEntity(base, actions),
        type,
        url: (await getUrl(storageId))!,
        caption,
      })
  }
}
