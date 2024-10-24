import { type Infer, v } from 'convex/values'
import { Schema } from 'effect'
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
  type: Schema.Literal('image-static'),
  url: Schema.NonEmptyTrimmedString,
  caption: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
  alt: Schema.OptionFromUndefinedOr(Schema.NonEmptyTrimmedString),
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
