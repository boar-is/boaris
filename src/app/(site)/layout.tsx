import type { PropsWithChildren } from 'react'
import { NewsletterSubscriptionFormProvider } from '~/features/newsletter-subscription-form-provider'
import { Button } from '~/lib/buttons/button'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { Heading } from '~/lib/content/heading'
import { FieldError, Form } from '~/lib/forms/form'
import { PendingFormDisabledButtonProvider } from '~/lib/forms/pending-form-disabled-button-provider'
import { Input, Label, TextField } from '~/lib/forms/text-field'
import { CloseIcon } from '~/lib/media/icons'
import logo from '~/lib/media/icons/logo.png'
import { SignatureIcon } from '~/lib/media/icons/signature'
import { Image } from '~/lib/media/image'
import { matchSocialNetworkIcon } from '~/lib/media/match-social-network-icon'
import { Link } from '~/lib/navigation/link'
import { CloseDialogButtonProvider } from '~/lib/overlays/close-dialog-button-provider'
import { Dialog, DialogTrigger } from '~/lib/overlays/dialog'
import { Modal, ModalOverlay } from '~/lib/overlays/modal'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { workspace } from '~/model/workspace'

const itemCx = cx('flex justify-center items-center rounded-lg h-full')

export default async function SiteLayout({ children }: PropsWithChildren) {
  const { name } = workspace
  const socialLinks = workspace.socialLinks.map((it) => ({
    ...it,
    Icon: matchSocialNetworkIcon(it.href),
  }))

  return (
    <div className="flex flex-col gap-4 md:gap-10 items-stretch min-h-dvh">
      <header className="container sticky z-10 top-0 py-3">
        <nav
          className={cx(
            shadowInsetStyles,
            'bg-clip-padding border border-white/10 rounded-3xl after:rounded-3xl p-2.5 drop-shadow-lg',
            'bg-gradient-to-br from-bg/50 to-bg/75 backdrop-blur-md backdrop-saturate-150',
          )}
        >
          <ul className="flex items-stretch justify-between gap-4 text-sm md:text-base">
            <li>
              <Link
                href="/"
                className={cx(
                  itemCx,
                  'gap-2 select-none text-lg leading-tight break-all font-semibold text-fg',
                )}
              >
                <Image
                  src={logo}
                  alt={`${name}'s logo`}
                  width={36}
                  height={36}
                  className="rounded-[inherit] shadow-inner size-9"
                />
                {name}
              </Link>
            </li>
            {socialLinks.map((socialLink, index) => (
              <li
                key={socialLink.href}
                className={cx({ 'ml-auto': index === 0 })}
              >
                <Link
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(buttonStyles({ intent: 'tertiary' }), itemCx)}
                >
                  <span className="sr-only">{socialLink.label} Profile</span>
                  <socialLink.Icon className="size-6" />
                </Link>
              </li>
            ))}
            <li>
              <DialogTrigger>
                <Button intent="primary" className={itemCx}>
                  Subscribe
                </Button>
                <ModalOverlay
                  isDismissable
                  className="isolate z-20 entering:fade-in-0 exiting:fade-out-0 fixed inset-0 grid h-[var(--visual-viewport-height)] entering:animate-in exiting:animate-out place-content-center bg-bg/25 px-4 backdrop-blur-sm backdrop-saturate-150"
                >
                  <Modal className="exiting:fade-out-0 entering:fade-in-0 exiting:zoom-out-95 entering:zoom-in-95 max-w-md entering:animate-in exiting:animate-out md:max-w-lg">
                    <Dialog
                      className={cx(
                        shadowInsetStyles,
                        'flex flex-col items-stretch gap-6 rounded-3xl after:rounded-3xl border border-white/15 bg-overlay/95 bg-clip-padding text-overlay-fg p-6 leading-relaxed md:rounded-3xl md:p-10 md:text-lg',
                      )}
                    >
                      <header className="flex justify-between items-center">
                        <Heading
                          slot="title"
                          className="font-semibold text-2xl md:text-4xl"
                        >
                          Like the format?
                        </Heading>
                        <CloseDialogButtonProvider>
                          <Button className="-mr-4 text-muted-fg/80">
                            <span className="sr-only">Close</span>
                            <CloseIcon className="size-6 md:size-8" />
                          </Button>
                        </CloseDialogButtonProvider>
                      </header>
                      <section className="flex flex-col gap-4 text-muted-fg">
                        <p>
                          My goal with this blog is to create helpful content
                          for front-end web devs. I have a{' '}
                          <strong>new and improved</strong> newsletter, and it
                          shares the same goal!
                        </p>
                        <p>
                          I'll let you know when I publish new content, and I'll
                          also send the occasional newsletter-only article. The
                          hope is to make something that sparks joy when you see
                          it in your inbox. 🌟
                        </p>
                        <p>
                          If you're not into it, you can unsubscribe instantly.
                          💨
                        </p>
                      </section>
                      <NewsletterSubscriptionFormProvider>
                        <Form className="flex flex-col gap-6">
                          <TextField
                            name="email"
                            type="email"
                            isRequired
                            autoFocus
                            className="flex w-full flex-col gap-1"
                          >
                            <Label className="text-muted-fg text-xs md:text-sm">
                              Email
                            </Label>
                            <Input
                              placeholder="person@cool-domain.com"
                              className="rounded-lg border border-muted bg-input px-3 py-1 text-lg placeholder-muted-fg transition-colors focus:border-border md:rounded-xl md:px-4 md:py-2 md:text-xl"
                            />
                            <FieldError className="text-error text-sm" />
                          </TextField>
                          <PendingFormDisabledButtonProvider>
                            <Button type="submit" intent="primary">
                              Subscribe
                            </Button>
                          </PendingFormDisabledButtonProvider>
                        </Form>
                      </NewsletterSubscriptionFormProvider>
                    </Dialog>
                  </Modal>
                </ModalOverlay>
              </DialogTrigger>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="container py-24 flex flex-row flex-wrap gap-5 justify-center items-center">
        <div className="text-lg font-semibold tracking-tight">with <span className="animate-pulse">❤️</span> by</div>
        <Link href="/" className="flex justify-center items-center">
          <span className="sr-only">Go to the home page</span>
          <SignatureIcon className="h-16 opacity-95 drop-shadow" />
        </Link>
      </footer>
    </div>
  )
}
