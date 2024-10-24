import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
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
  type: Schema.Literal('image-dynamic'),
  url: Schema.NonEmptyTrimmedString,
  caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
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
