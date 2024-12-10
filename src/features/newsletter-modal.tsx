'use client'

import { Button } from '~/lib/buttons/button'
import { Heading } from '~/lib/content/heading'
import { FieldError, Form } from '~/lib/forms/form'
import { PendingFormDisabledButtonProvider } from '~/lib/forms/pending-form-disabled-button-provider'
import { Input, Label, TextField } from '~/lib/forms/text-field'
import { CloseIcon } from '~/lib/media/icons/close'
import { Dialog } from '~/lib/overlays/dialog'
import {
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from '~/lib/overlays/modal'
import { cr } from '~/lib/react/cr'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { NewsletterSubscriptionFormProvider } from './newsletter-subscription-form-provider'

export function NewsletterModal({ className, ...props }: ModalOverlayProps) {
  return (
    <ModalOverlay
      isDismissable
      className={cr(className, (className) =>
        cx(
          'isolate z-20 entering:fade-in-0 exiting:fade-out-0 fixed inset-0 grid h-[var(--visual-viewport-height)] entering:animate-in exiting:animate-out place-content-center bg-black',
          className,
        ),
      )}
      {...props}
    >
      <Modal className="exiting:fade-out-0 entering:fade-in-0 exiting:zoom-out-95 entering:zoom-in-95 ~max-w-md/lg entering:animate-in exiting:animate-out">
        <Dialog
          className={cx(
            shadowInsetStyles,
            'flex flex-col items-stretch gap-6 rounded-4xl after:rounded-4xl border border-white/15 bg-gray-2/95 bg-clip-padding ~p-6/10 leading-relaxed ~text-base/lg',
          )}
        >
          <header className="flex justify-between items-center">
            <Heading slot="title" className="font-semibold ~text-2xl/4xl">
              Like the format?
            </Heading>
            <Button className="-mr-4 text-gray-10" slot="close">
              <span className="sr-only">Close</span>
              <CloseIcon className="~size-6/8" />
            </Button>
          </header>
          <section className="flex flex-col gap-4 text-gray-11">
            <p>
              My goal with this blog is to create helpful content for front-end
              web devs. I have a <strong>new and improved</strong> newsletter,
              and it shares the same goal!
            </p>
            <p>
              I'll let you know when I publish new content, and I'll also send
              the occasional newsletter-only article. The hope is to make
              something that sparks joy when you see it in your inbox. 🌟
            </p>
            <p>If you're not into it, you can unsubscribe instantly. 💨</p>
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
                <Label className="text-gray-11 ~text-sm/base">Email</Label>
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
  )
}
