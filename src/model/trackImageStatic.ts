import * as S from '@effect/schema/Schema'
import { type Infer, v } from 'convex/values'
import type { action } from '~/convex/data/action'
import type { PropsWithGetUrl } from '~/convex/utils/propsWithGetUrl'
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
  static async encodedFromEntity(
    { type, storageId, caption, alt, ...base }: Infer<typeof trackImageStatic>,
    actions: Array<Infer<typeof action>>,
    { getUrl }: PropsWithGetUrl,
  ): Promise<typeof TrackImageStatic.Encoded> {
    return {
      ...TrackBase.encodedFromEntity(base, actions),
      type,
      url: (await getUrl(storageId))!,
      caption,
      alt,
    }
  }
}
