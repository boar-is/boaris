import Link from 'next/link'
import { SubscriptionFormProvider } from '~/app/(marketing)/_/navbar.client'
import { Button, PendingFormDisabledButtonProvider } from '~/components/button'
import { CloseDialogButton, Dialog, DialogTrigger } from '~/components/dialog'
import { FieldError, Form } from '~/components/form'
import { Heading } from '~/components/heading'
import { BrandIcon, CloseIcon, MenuIcon } from '~/components/icons'
import { Menu, MenuItem, MenuTrigger } from '~/components/menu'
import { Modal, ModalOverlay } from '~/components/modal'
import { Popover } from '~/components/popover'
import { Input, Label, TextField } from '~/components/text-field'
import { cs } from '~/lib/cs'

export function Navbar() {
  return (
    <nav className={layerStyles}>
      <ul className="flex min-h-14 items-stretch justify-between gap-2 p-2.5 text-sm md:gap-4 md:text-md">
        <li>
          <Link
            href="/"
            prefetch={false}
            className={cs(
              navItemBaseStyles,
              'flex select-none items-center gap-1 px-2 text-lg tracking-tighter md:gap-1.5 md:text-lg',
            )}
          >
            <BrandIcon className="size-[1em]" />
            boar.is
          </Link>
        </li>
        <li className="ml-auto hidden md:block">
          <Link href="/articles" prefetch={false} className={navItemStyles}>
            Articles
          </Link>
        </li>
        <li className="hidden md:block">
          <Link href="/about" prefetch={false} className={navItemStyles}>
            About
          </Link>
        </li>
        <li className="ml-auto md:ml-0">
          <DialogTrigger>
            <Button
              type="button"
              className={cs(
                navItemBaseStyles,
                'bg-gray-950 font-semibold text-gray-50',
              )}
            >
              Subscribe
            </Button>
            <ModalOverlay
              isDismissable
              className="entering:fade-in-0 exiting:fade-out-0 fixed inset-0 grid h-[var(--visual-viewport-height)] entering:animate-in exiting:animate-out place-content-center bg-gray-50/75 px-4 backdrop-blur-sm backdrop-saturate-150"
            >
              <Modal className="exiting:fade-out-0 entering:fade-in-0 exiting:zoom-out-95 entering:zoom-in-95 max-w-md entering:animate-in exiting:animate-out md:max-w-lg">
                <Dialog className="flex flex-col items-stretch gap-5 rounded-xl border border-gray-400 bg-gray-100 p-4 leading-relaxed md:p-6 md:text-lg">
                  <header className="flex justify-between">
                    <Heading
                      slot="title"
                      className="font-semibold text-2xl text-gray-950 md:text-3xl"
                    >
                      Like the format?
                    </Heading>
                    <CloseDialogButton className="rounded-sm text-gray-700">
                      <span className="sr-only">Close</span>
                      <CloseIcon className="size-6 md:size-8" />
                    </CloseDialogButton>
                  </header>
                  <section className="flex flex-col gap-4">
                    <p>
                      My goal with this blog is to create helpful content for
                      front-end web devs. I have a{' '}
                      <strong>new and improved</strong> newsletter, and it
                      shares the same goal!
                    </p>
                    <p>
                      I'll let you know when I publish new content, and I'll
                      also send the occasional newsletter-only article. The hope
                      is to make something that sparks joy when you see it in
                      your inbox. 🌟
                    </p>
                    <p>
                      If you're not into it, you can unsubscribe instantly. 💨
                    </p>
                  </section>
                  <SubscriptionFormProvider>
                    <Form className="flex flex-col gap-4">
                      <TextField
                        name="email"
                        type="email"
                        isRequired
                        autoFocus
                        className="flex w-full flex-col gap-1"
                      >
                        <Label className="text-gray-800 text-sm md:text-md">
                          Email
                        </Label>
                        <Input
                          placeholder="person@cool-domain.com"
                          className="rounded-lg border border-gray-500 bg-gray-50 px-3 py-1 text-gray-950 text-lg placeholder-gray-700 transition-colors focus:border-gray-800 md:text-xl"
                        />
                        <FieldError className="text-error text-sm" />
                      </TextField>
                      <PendingFormDisabledButtonProvider>
                        <Button
                          type="submit"
                          className="block rounded-lg bg-gray-950 p-2 font-semibold text-gray-50 transition-opacity disabled:opacity-80"
                        >
                          Subscribe
                        </Button>
                      </PendingFormDisabledButtonProvider>
                    </Form>
                  </SubscriptionFormProvider>
                </Dialog>
              </Modal>
            </ModalOverlay>
          </DialogTrigger>
        </li>
        <li className="block md:hidden">
          <MenuTrigger>
            <Button
              type="button"
              className={cs(
                navItemBaseStyles,
                'group relative size-5 px-1.5 text-gray-950',
              )}
            >
              <span className="sr-only">Menu</span>
              <MenuIcon className="rotate-0 scale-100 transition-transform group-aria-expanded:rotate-90 group-aria-expanded:scale-0" />
              <CloseIcon className="absolute rotate-90 scale-0 transition-transform group-aria-expanded:rotate-0 group-aria-expanded:scale-100" />
            </Button>
            <Popover
              placement="bottom end"
              offset={18}
              crossOffset={12}
              className="entering:fade-in exiting:fade-out entering:animate-in exiting:animate-out"
            >
              <Menu
                className={cs(
                  layerStyles,
                  'flex min-w-40 flex-col gap-1.5 p-2.5 font-semibold text-lg',
                )}
              >
                <MenuItem href="/blog" className={mobileMenuItemStyles}>
                  Blog
                </MenuItem>
                <MenuItem href="/about" className={mobileMenuItemStyles}>
                  About
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </li>
      </ul>
    </nav>
  )
}

const layerStyles = cs(
  'bg-gray-50/75 backdrop-blur-md backdrop-saturate-150 rounded-2xl border border-gray-400 text-gray-950',
)

const navItemBaseStyles = cs(
  'flex justify-center items-center rounded-lg h-full px-3 md:px-4',
)

const navItemStyles = cs(
  navItemBaseStyles,
  'font-semibold transition-colors text-gray-900 hover:text-gray-950',
)

const mobileMenuItemStyles = cs('block px-2 py-1 rounded-lg')
