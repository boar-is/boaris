import { Array, pipe } from 'effect'
import type { PropsWithChildren } from 'react'
import { NewsletterSubscriptionFormProvider } from '~/features/newsletter-subscription-form-provider'
import { Button } from '~/lib/buttons/button'
import { buttonStyles } from '~/lib/buttons/button-styles'
import { Heading } from '~/lib/content/heading'
import { FieldError, Form } from '~/lib/forms/form'
import { PendingFormDisabledButtonProvider } from '~/lib/forms/pending-form-disabled-button-provider'
import { Input, Label, TextField } from '~/lib/forms/text-field'
import { CloseIcon, SignatureIcon } from '~/lib/media/icons'
import logo from '~/lib/media/icons/logo.png'
import { Image } from '~/lib/media/image'
import { matchSocialNetworkIcon } from '~/lib/media/match-social-network-icon'
import { BlurFade } from '~/lib/motion/blur-fade'
import { Link } from '~/lib/navigation/link'
import { CloseDialogButtonProvider } from '~/lib/overlays/close-dialog-button-provider'
import { Dialog, DialogTrigger } from '~/lib/overlays/dialog'
import { Modal, ModalOverlay } from '~/lib/overlays/modal'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { workspace } from '~/model/workspace'

const itemCx = cx('flex justify-center items-center rounded-full h-full')

export default async function SiteLayout({ children }: PropsWithChildren) {
  const { name } = workspace

  const socialLinks = pipe(
    workspace.socialLinks,
    Array.map((link) => ({
      ...link,
      Icon: matchSocialNetworkIcon(link.href),
    })),
  )

  return (
    <div className="flex flex-col ~gap-4/10 items-stretch min-h-dvh">
      <header className="container sticky z-10 top-0 py-3">
        <nav
          className={cx(
            shadowInsetStyles,
            'bg-clip-padding border border-white/10 rounded-full after:rounded-full p-2.5 drop-shadow-lg',
            'bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-blur-md backdrop-saturate-150',
          )}
        >
          <ul className="flex items-stretch justify-between ~gap-2/4">
            <li>
              <Link
                href="/"
                className={cx(
                  itemCx,
                  '~gap-1.5/2.5 select-none ~text-lg/xl leading-tight break-all font-semibold',
                )}
              >
                <Image
                  src={logo}
                  alt={`${name}'s logo`}
                  width={36}
                  height={36}
                  className="rounded-[inherit] shadow-inner ~size-8/10"
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
                  className={cx(
                    buttonStyles({ intent: 'tertiary' }),
                    itemCx,
                    '~px-2/3 ~-mx-1/2  text-gray-10',
                  )}
                >
                  <span className="sr-only">{socialLink.label} Profile</span>
                  <socialLink.Icon className="~size-4/6" />
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <DialogTrigger>
                <Button
                  intent="primary"
                  className={cx(itemCx, '~text-sm/base')}
                >
                  Subscribe
                </Button>
                <ModalOverlay
                  isDismissable
                  className="isolate z-20 entering:fade-in-0 exiting:fade-out-0 fixed inset-0 grid h-[var(--visual-viewport-height)] entering:animate-in exiting:animate-out place-content-center bg-black/25 px-4 backdrop-blur-sm backdrop-saturate-150"
                >
                  <Modal className="exiting:fade-out-0 entering:fade-in-0 exiting:zoom-out-95 entering:zoom-in-95 ~max-w-md/lg entering:animate-in exiting:animate-out">
                    <Dialog
                      className={cx(
                        shadowInsetStyles,
                        'flex flex-col items-stretch gap-6 rounded-4xl after:rounded-4xl border border-white/15 bg-gray-2/95 bg-clip-padding ~p-6/10 leading-relaxed ~text-base/lg',
                      )}
                    >
                      <header className="flex justify-between items-center">
                        <Heading
                          slot="title"
                          className="font-semibold ~text-2xl/4xl"
                        >
                          Like the format?
                        </Heading>
                        <CloseDialogButtonProvider>
                          <Button className="-mr-4 text-gray-10">
                            <span className="sr-only">Close</span>
                            <CloseIcon className="~size-6/8" />
                          </Button>
                        </CloseDialogButtonProvider>
                      </header>
                      <section className="flex flex-col gap-4 text-gray-11">
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
                        <Form className="flex flex-col gap-4">
                          <TextField
                            name="email"
                            type="email"
                            isRequired
                            autoFocus
                            className="flex w-full flex-col gap-1"
                          >
                            <Label className="text-gray-11 ~text-sm/base">
                              Email
                            </Label>
                            <Input
                              placeholder="person@cool-domain.com"
                              className="rounded-xl border border-accent-7 focus:border-accent-8 bg-accent-2 ~px-3/4 ~py-1/2 ~text-lg/xl placeholder-accent-5 transition-colors"
                            />
                            <FieldError className="text-destructive-9 text-sm" />
                          </TextField>
                          <PendingFormDisabledButtonProvider>
                            <Button
                              type="submit"
                              intent="primary"
                              className="rounded-xl ~text-base/xl"
                            >
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
      <footer className="container pb-24 pt-12 flex justify-center items-center">
        <BlurFade inView>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-center"
          >
            <SignatureIcon className="mx-4 inline-block h-16 opacity-95 drop-shadow" />
          </Link>
        </BlurFade>
      </footer>
    </div>
  )
}
