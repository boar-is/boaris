import type { CSSProperties, PropsWithChildren } from 'react'
import { NewsletterSubscriptionFormProvider } from '~/features/newsletter-subscription-form-provider'
import { Button } from '~/lib/buttons/button'
import { Menu, MenuItem, MenuTrigger } from '~/lib/collections/menu'
import { Header } from '~/lib/content/header'
import { Heading } from '~/lib/content/heading'
import { Section } from '~/lib/content/section'
import { FieldError, Form } from '~/lib/forms/form'
import { PendingFormDisabledButtonProvider } from '~/lib/forms/pending-form-disabled-button-provider'
import { Input, Label, TextField } from '~/lib/forms/text-field'
import { CloseIcon, MenuIcon } from '~/lib/media/icons'
import logo from '~/lib/media/icons/logo.png'
import { Image } from '~/lib/media/image'
import { matchSocialNetworkIcon } from '~/lib/media/match-social-network-icon'
import { Link } from '~/lib/navigation/link'
import { CloseDialogButtonProvider } from '~/lib/overlays/close-dialog-button-provider'
import { Dialog, DialogTrigger } from '~/lib/overlays/dialog'
import { Modal, ModalOverlay } from '~/lib/overlays/modal'
import { Popover } from '~/lib/overlays/popover'
import { cx } from '~/lib/react/cx'
import { workspace } from '~/model/workspace'

const layerCx = cx('border rounded-2xl p-3')
const mutedCx = cx('transition-colors text-muted-fg hover:text-fg')
const itemCx = cx('flex justify-center items-center rounded-lg h-full')
const squareCx = cx('px-1 md:px-2.5 md:-mx-2')
const rectCx = cx('px-3 md:px-4')
const sectionMobileCx = cx('flex flex-col *:px-2 *:py-1')
const headerMobileCx = cx('text-xs uppercase text-muted-fg tracking-tight')
const itemMobileCx = cx('rounded-md')

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
            layerCx,
            'bg-bg/50 backdrop-blur-md backdrop-saturate-150',
          )}
        >
          <ul className="flex items-stretch justify-between gap-2 text-sm md:gap-8 md:text-base">
            <li>
              <Link
                href="/"
                className={cx(
                  itemCx,
                  'gap-2 select-none text-lg leading-tight break-all font-semibold',
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
            <li className="hidden md:block mr-auto">
              <Link href="/blog" className={cx(itemCx, rectCx, mutedCx)}>
                Blog
              </Link>
            </li>
            {socialLinks.map((socialLink, index) => (
              <li
                key={socialLink.href}
                className={cx('hidden md:block', {
                  'ml-auto': index === 0,
                })}
              >
                <Link
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(itemCx, squareCx, mutedCx)}
                >
                  <span className="sr-only">{socialLink.label} Profile</span>
                  <socialLink.Icon className="size-5" />
                </Link>
              </li>
            ))}
            <li className="ml-auto md:ml-0">
              <DialogTrigger>
                <Button
                  type="button"
                  className={cx(
                    itemCx,
                    rectCx,
                    'relative min-h-10 bg-primary text-primary-fg transition-colors font-medium',
                    'animate-rainbow bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]',
                    'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]',
                    'bg-[linear-gradient(#000,#000),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',
                  )}
                  style={
                    {
                      '--color-1': '0 100% 63%',
                      '--color-2': '270 100% 63%',
                      '--color-3': '210 100% 63%',
                      '--color-4': '195 100% 63%',
                      '--color-5': '90 100% 63%',
                    } as CSSProperties
                  }
                >
                  Like the Format?
                </Button>
                <ModalOverlay
                  isDismissable
                  className="z-20 entering:fade-in-0 exiting:fade-out-0 fixed inset-0 grid h-[var(--visual-viewport-height)] entering:animate-in exiting:animate-out place-content-center bg-bg/25 px-4 backdrop-blur-sm backdrop-saturate-150"
                >
                  <Modal className="exiting:fade-out-0 entering:fade-in-0 exiting:zoom-out-95 entering:zoom-in-95 max-w-md entering:animate-in exiting:animate-out md:max-w-lg">
                    <Dialog className="flex flex-col items-stretch gap-5 rounded-xl border border-muted bg-overlay p-4 leading-relaxed md:rounded-2xl md:p-6 md:text-lg">
                      <header className="flex justify-between">
                        <Heading
                          slot="title"
                          className="font-semibold text-2xl md:text-3xl"
                        >
                          Like the format?
                        </Heading>
                        <CloseDialogButtonProvider>
                          <Button className="rounded-sm text-muted-fg">
                            <span className="sr-only">Close</span>
                            <CloseIcon className="size-6 md:size-8" />
                          </Button>
                        </CloseDialogButtonProvider>
                      </header>
                      <section className="flex flex-col gap-4">
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
                            <Button
                              type="submit"
                              className="block rounded-lg bg-primary p-2 font-medium text-primary-fg transition-colors hover:bg-primary/80 disabled:bg-primary/60 md:rounded-xl"
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
            <li className="md:hidden">
              <MenuTrigger>
                <Button
                  type="button"
                  className={cx(itemCx, squareCx, 'group relative px-1.5')}
                >
                  <span className="sr-only">Toggle Menu</span>
                  <MenuIcon className="size-5 rotate-0 scale-100 transition-transform group-aria-expanded:rotate-90 group-aria-expanded:scale-0" />
                  <CloseIcon className="-rotate-90 absolute size-5 scale-0 transition-transform group-aria-expanded:rotate-0 group-aria-expanded:scale-100" />
                </Button>
                <Popover
                  placement="bottom end"
                  offset={28}
                  crossOffset={16}
                  className="entering:fade-in exiting:fade-out entering:animate-in exiting:animate-out"
                >
                  <Menu
                    className={cx(
                      layerCx,
                      'flex min-w-40 flex-col gap-2 bg-overlay text-overlay-fg font-semibold text-lg',
                    )}
                  >
                    <Section className={sectionMobileCx}>
                      <Header className={headerMobileCx}>Projects</Header>
                      <MenuItem href="/blog" className={itemMobileCx}>
                        Blog
                      </MenuItem>
                    </Section>
                    <Section className={sectionMobileCx}>
                      <Header className={headerMobileCx}>Social</Header>
                      {socialLinks.map((socialLink) => (
                        <MenuItem
                          key={socialLink.href}
                          href={socialLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={itemMobileCx}
                        >
                          {socialLink.label}
                        </MenuItem>
                      ))}
                    </Section>
                  </Menu>
                </Popover>
              </MenuTrigger>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="container">
        <div className="container">
          <ul className="flex justify-between py-4 font-semibold text-muted-fg md:gap-4">
            <li>
              <Link href="/" className="rounded-sm px-2">
                {name}
              </Link>
            </li>
            {socialLinks.map((socialLink, index) => (
              <li
                key={socialLink.href}
                className={cx({ 'ml-auto': index === 0 })}
              >
                <a
                  href={socialLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm px-2"
                >
                  {socialLink.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  )
}
