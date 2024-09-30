import type { CSSProperties } from 'react'
import { Button, PendingFormDisabledButtonProvider } from '~/components/button'
import { CloseDialogButton, Dialog, DialogTrigger } from '~/components/dialog'
import { FieldError, Form } from '~/components/form'
import { Header } from '~/components/header'
import { Heading } from '~/components/heading'
import { CloseIcon, MenuIcon } from '~/components/icons'
import { Image } from '~/components/image'
import { Link } from '~/components/link'
import { Menu, MenuItem, MenuTrigger } from '~/components/menu'
import { Modal, ModalOverlay } from '~/components/modal'
import { Popover } from '~/components/popover'
import { Section } from '~/components/section'
import { Input, Label, TextField } from '~/components/text-field'
import type { WorkspaceVm } from '~/lib/api/get-workspace'
import { cx } from '~/lib/cx'
import { SubscriptionFormProvider } from './navbar.client'

export function Navbar({ workspace }: { workspace: WorkspaceVm }) {
  return (
    <nav
      className={cx(
        layerCx,
        'bg-gray-1/75 backdrop-blur-sm backdrop-saturate-150',
      )}
    >
      <ul className="flex items-stretch font-medium justify-between gap-2 text-sm md:gap-6 md:text-base">
        <li>
          <Link
            href="/"
            className={cx(
              itemCx,
              'gap-2 select-none text-gray-12 text-lg leading-tight break-all',
            )}
          >
            {workspace.logoSrc && (
              <Image
                src={workspace.logoSrc}
                alt={`${workspace.name}'s logo`}
                width={36}
                height={36}
                className="rounded-[inherit] shadow-inner"
              />
            )}
            Boar.is
          </Link>
        </li>
        <li className="hidden md:block mr-auto">
          <Link href="/blog" className={cx(itemCx, rectCx, mutedCx)}>
            Blog
          </Link>
        </li>
        {workspace.socials?.map((social, index) => (
          <li
            key={social.name}
            className={cx('hidden md:block', { 'ml-auto': index === 0 })}
          >
            <Link
              href={social.src}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(itemCx, squareCx, mutedCx)}
            >
              <span className="sr-only">{social.name} Profile</span>
              <social.icon className="size-5" />
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
                'relative bg-gray-12 font-medium text-gray-1 transition-colors hover:bg-gray-11 hover:text-gray-1',
                'animate-rainbow bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]',
                'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]',
                'bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',
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
              Subscribe
            </Button>
            <ModalOverlay
              isDismissable
              className="z-20 entering:fade-in-0 exiting:fade-out-0 fixed inset-0 grid h-[var(--visual-viewport-height)] entering:animate-in exiting:animate-out place-content-center bg-gray-1/25 px-4 backdrop-blur-sm backdrop-saturate-150"
            >
              <Modal className="exiting:fade-out-0 entering:fade-in-0 exiting:zoom-out-95 entering:zoom-in-95 max-w-md entering:animate-in exiting:animate-out md:max-w-lg">
                <Dialog className="flex flex-col items-stretch gap-5 rounded-xl border border-gray-4 bg-gray-2 p-4 leading-relaxed md:rounded-2xl md:p-6 md:text-lg">
                  <header className="flex justify-between">
                    <Heading
                      slot="title"
                      className="font-semibold text-2xl text-gray-12 md:text-3xl"
                    >
                      Like the format?
                    </Heading>
                    <CloseDialogButton className="rounded-sm text-gray-7">
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
                        <Label className="text-gray-10 text-xs md:text-sm">
                          Email
                        </Label>
                        <Input
                          placeholder="person@cool-domain.com"
                          className="rounded-lg border border-gray-5 bg-gray-1 px-3 py-1 text-gray-12 text-lg placeholder-gray-8 transition-colors focus:border-gray-10 md:rounded-xl md:px-4 md:py-2 md:text-xl"
                        />
                        <FieldError className="text-error text-sm" />
                      </TextField>
                      <PendingFormDisabledButtonProvider>
                        <Button
                          type="submit"
                          className="block rounded-lg bg-gray-12 p-2 font-medium text-gray-1 transition-colors hover:bg-gray-11 disabled:bg-gray-11 md:rounded-xl"
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
        <li className="md:hidden">
          <MenuTrigger>
            <Button
              type="button"
              className={cx(
                itemCx,
                squareCx,
                'group relative px-1.5 text-gray-12',
              )}
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
                  'flex min-w-40 flex-col gap-2 bg-gray-1 font-semibold text-gray-12 text-lg',
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
                  {workspace.socials?.map((social) => (
                    <MenuItem
                      key={social.name}
                      href={social.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={itemMobileCx}
                    >
                      {social.name}
                    </MenuItem>
                  ))}
                </Section>
              </Menu>
            </Popover>
          </MenuTrigger>
        </li>
      </ul>
    </nav>
  )
}

const layerCx = cx('border border-gray-4 rounded-2xl p-4')
const mutedCx = cx('transition-colors text-gray-10 hover:text-gray-12')
const itemCx = cx('flex justify-center items-center rounded-lg h-full')
const squareCx = cx('px-1 md:px-2.5 md:-mx-2')
const rectCx = cx('px-3 md:px-4')
const sectionMobileCx = cx('flex flex-col *:px-2 *:py-1')
const headerMobileCx = cx('text-xs uppercase text-gray-9 tracking-tight')
const itemMobileCx = cx('rounded-md')
