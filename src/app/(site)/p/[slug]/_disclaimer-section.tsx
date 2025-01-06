import { Option } from 'effect'
import {
  PostLinkDiscussOnX,
  PostLinkShareOnX,
} from '~/app/(site)/p/[slug]/_x-links'
import { resolveUrl } from '~/lib/metadata/resolvers'

export function DisclaimerSection({
  slug,
  twitterUrl,
}: { slug: string; twitterUrl: Option.Option<string> }) {
  return (
    <div className="space-x-4 bg-accent-4/35 border border-accent-7 ~rounded-lg/3xl ~py-4/8 ~px-3/6">
      <PostLinkShareOnX
        text="Check out this blog post from @MrBoaris:"
        url={resolveUrl(`/p/${slug}`)}
      />
      {twitterUrl.pipe(
        Option.andThen((url) => <PostLinkDiscussOnX url={url} />),
        Option.getOrNull,
      )}
    </div>
  )
}
