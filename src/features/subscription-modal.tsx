import { SubscriptionSectionFormProvider } from '~/app/(site)/p/[slug]/_subscription-section-form-modal'
import { Button } from '~/lib/buttons/button'
import { Heading } from '~/lib/content/heading'
import { Form } from '~/lib/forms/form'
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

export function SubscriptionModal({ className, ...props }: ModalOverlayProps) {
  return (
    <ModalOverlay
      isDismissable
      className={cr(className, (className) =>
        cx(
          'isolate z-20 entering:fade-in-0 exiting:fade-out-0 fixed inset-0 grid h-[var(--visual-viewport-height)] entering:animate-in exiting:animate-out place-content-center bg-black/35 backdrop-blur-lg',
          className,
        ),
      )}
      {...props}
    >
      <Modal className="~px-2/4 exiting:fade-out-0 entering:fade-in-0 exiting:zoom-out-95 entering:zoom-in-95 ~max-w-lg/3xl entering:animate-in exiting:animate-out">
        <Dialog
          className={cx(
            shadowInsetStyles,
            'flex flex-col items-stretch ~gap-4/6 ~rounded-3xl/4xl after:~rounded-3xl/4xl font-medium border border-white/15 bg-gray-2/95 bg-clip-padding ~p-4/8 leading-relaxed ~text-sm/lg',
          )}
        >
          <header className="flex justify-between items-center">
            <Heading slot="title" className="font-semibold ~text-2xl/4xl">
              Enjoyed the format?
            </Heading>
            <Button className="-mr-4 text-gray-10" slot="close">
              <span className="sr-only">Close</span>
              <CloseIcon className="~size-6/8" />
            </Button>
          </header>
          <p>
            I’m on a mission to make learning more thoughtful and effective.
            This format is just the beginning, and I’d love for you to join me
            on this journey. Subscribe to stay updated on new posts and format
            refinements.
          </p>
          <SubscriptionSectionFormProvider>
            <Form className="w-full flex ~gap-2/4 items-stretch">
              <TextField
                name="email"
                type="email"
                isRequired
                autoFocus
                className="basis-3/5"
              >
                <Label className="sr-only">Email</Label>
                <Input
                  placeholder="wow-person@domain.com"
                  className="rounded-xl border border-accent-8 focus:border-accent-11 text-accent-11 bg-accent-3 ~px-3/4 ~py-1/2 ~text-base/xl h-full placeholder-accent-7 transition-colors w-full"
                />
              </TextField>
              <PendingFormDisabledButtonProvider>
                <Button
                  type="submit"
                  intent="primary"
                  className="rounded-xl basis-2/5"
                >
                  Subscribe
                </Button>
              </PendingFormDisabledButtonProvider>
            </Form>
          </SubscriptionSectionFormProvider>
          <p>Let’s make learning better — together.</p>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
