import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import type { PropsWithGetUrl } from '~/convex/utils/propsWithGetUrl'
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
  static async encodedFromEntity(
    { type, storageId, caption, ...base }: Infer<typeof trackImageDynamic>,
    actions: Array<Infer<typeof action>>,
    { getUrl }: PropsWithGetUrl,
  ): Promise<typeof TrackImageDynamic.Encoded> {
    return {
      ...TrackBase.encodedFromEntity(base, actions),
      type,
      url: (await getUrl(storageId))!,
      caption,
    }
  }
}
