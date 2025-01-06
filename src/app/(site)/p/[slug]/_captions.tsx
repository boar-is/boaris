import { Schema } from 'effect'
import { PostCaptionsContent } from '~/app/(site)/p/[slug]/_captions-content'
import { Captions, captionsRepository } from '~/model/captions'

export function PostCaptions({
  slug,
  className,
}: { slug: string; className?: string | undefined }) {
  const captions = captionsRepository.find((it) => it.postSlug === slug)

  if (!captions) {
    throw new Error(`Captions were not found for slug "${slug}"`)
  }

  return (
    <PostCaptionsContent
      contentEncoded={Schema.encodeSync(Captions)(captions)}
      className={className}
    />
  )
}
