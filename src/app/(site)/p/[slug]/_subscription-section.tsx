import { SubscriptionFormProvider } from '~/features/subscription-form-provider'
import { Button } from '~/lib/buttons/button'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { Form } from '~/lib/forms/form'
import { Input, Label, TextField } from '~/lib/forms/text-field'
import { XIcon } from '~/lib/media/icons'
import { constructXIntent } from '~/lib/navigation/construct-x-intent'
import { Link, type LinkProps } from '~/lib/navigation/link'
import { cx } from '~/lib/react/cx'
import { resolveUrl } from '~/lib/routing/resolvers'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'

const linkProps: LinkProps = {
  className: buttonStyles({
    intent: 'secondary',
    size: 'sm',
    className: 'inline-flex gap-1 [&_svg]:~size-3/4 my-0.5 py-0 text-[0.8em]',
  }),
  target: '_blank',
}

export function PostSubscriptionSection({
  slug,
  intent,
  twitterUrl,
}: { slug: string; intent: string; twitterUrl?: string | undefined }) {
  return (
    <article
      className={cx(
        shadowInsetStyles,
        'mx-auto space-y-4 font-medium ~text-base/xl max-w-[80ch] bg-gray-4/30 bg-clip-padding border border-gray-9/50 ~rounded-2xl/4xl after:~rounded-2xl/4xl ~p-5/8 leading-relaxed drop-shadow-lg',
      )}
    >
      <p>
        I’m on a mission to make learning more thoughtful and effective. This is
        just the beginning, and I’d love for you to join me on this journey.
        Subscribe to stay updated on new posts. No spam.
      </p>
      <SubscriptionFormProvider>
        <Form className="max-w-lg flex ~gap-2/4 items-stretch">
          <TextField name="email" type="email" isRequired className="basis-3/5">
            <Label className="sr-only">Email</Label>
            <Input
              placeholder="wow-person@domain.com"
              className="rounded-xl border border-accent-8 focus:border-accent-11 text-accent-11 bg-accent-3 ~px-3/4 ~py-1/2 ~text-base/xl h-full placeholder-accent-7 transition-colors w-full"
            />
          </TextField>
          <Button
            type="submit"
            intent="primary"
            className="rounded-xl basis-2/5"
          >
            Subscribe
          </Button>
        </Form>
      </SubscriptionFormProvider>
      <p>Let’s make learning better — together.</p>
      <div className="flex ~gap-2/4">
        {twitterUrl && (
          <Link {...linkProps} href={twitterUrl}>
            Discuss on
            <XIcon />
          </Link>
        )}
        <Link
          {...linkProps}
          href={constructXIntent(intent, resolveUrl(`/p/${slug}`))}
        >
          Share this post on <XIcon />
        </Link>
      </div>
    </article>
  )
}
