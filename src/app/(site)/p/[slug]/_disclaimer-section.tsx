import { Option } from 'effect'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { XIcon } from '~/lib/media/icons'
import { resolveUrl } from '~/lib/metadata/resolvers'
import { constructXIntent } from '~/lib/navigation/construct-x-intent'
import { Link, type LinkProps } from '~/lib/navigation/link'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'

const whitespace = ' '

const linkProps: LinkProps = {
  className: buttonStyles({
    intent: 'secondary',
    size: 'sm',
    className: 'inline-flex gap-1 [&_svg]:~size-3/4 my-0.5 py-0 text-[0.8em]',
  }),
  target: '_blank',
}

export function PostDisclaimerSection({
  slug,
  intent,
  twitterUrl,
}: { slug: string; intent: string; twitterUrl: Option.Option<string> }) {
  return (
    <article
      className={cx(
        shadowInsetStyles,
        'mx-auto space-y-4 font-medium ~text-base/xl max-w-[80ch] bg-accent-4/30 bg-clip-padding border border-accent-9/50 ~rounded-2xl/4xl after:~rounded-2xl/4xl ~p-5/8 leading-relaxed drop-shadow-lg [&_em]:underline [&_em]:decoration-accent-11 [&_em]:decoration-wavy [&_em]:not-italic',
      )}
    >
      <p className="~text-lg/2xl font-semibold tracking-tight text-accent-12">
        “Learning is <em>not</em> a race. Unless you want to do a second lap.”
      </p>
      <p>
        That’s why this blog introduces an experimental format that{whitespace}
        <em>blends the best</em> of text and video. It slows down scrolling,
        making it
        {whitespace}
        <em>easier</em> to explore code examples and follow the explanation
        {whitespace}
        <em>step by step</em>.
      </p>
      <p>
        I’d love to hear what you think!{whitespace}
        <Link
          href={process.env['CONTACT_ME_FORM_URL']!}
          target="_blank"
          className="text-accent-11 font-medium"
        >
          Contact me
        </Link>
        {twitterUrl.pipe(
          Option.andThen((url) => (
            <>
              {whitespace}or{whitespace}
              <Link {...linkProps} href={url}>
                Discuss on
                <XIcon />
              </Link>
            </>
          )),
          Option.getOrNull,
        )}
        {whitespace}— your thoughts truly matter.
      </p>
      <p>
        If you’re enjoying this approach, please also{whitespace}
        <Link
          {...linkProps}
          href={constructXIntent(intent, resolveUrl(`/p/${slug}`))}
        >
          Share this post on <XIcon />
        </Link>
        {whitespace}— it would mean a lot!
      </p>
    </article>
  )
}
