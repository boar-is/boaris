import type { Captions } from '~/model/captions'
import nextjsMetadataCaptionsContent from './nextjs-metadata.json'

export const captionsRepository: ReadonlyArray<typeof Captions.Encoded> = [
  {
    postSlug: 'nextjs-metadata',
    content: JSON.stringify(nextjsMetadataCaptionsContent),
  },
]
