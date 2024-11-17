'use client'

import {
  type PropsWithChildren,
  useActionState,
  useContext,
  useEffect,
} from 'react'
import { FormContext } from '~/lib/forms/form'
import { OverlayTriggerStateContext } from '~/lib/overlays/dialog'
import { toast } from '~/lib/toast/toast'
import { newsletterSubscriptionAction } from './newsletter-subscription-action'

export function NewsletterSubscriptionFormProvider({
  children,
}: PropsWithChildren) {
  const [state, action] = useActionState(newsletterSubscriptionAction, {
    status: 'initial',
  })

  const { isOpen, close } = useContext(OverlayTriggerStateContext)

  useEffect(() => {
    if (isOpen && state.status === 'success') {
      close()
      toast.success(`Confirmation email sent to ${state.email}`, {
        description: 'Please, check your inbox and a spam folder',
        duration: 10e3,
      })
    }
  }, [state, isOpen, close])

  return (
    <FormContext.Provider
      value={{
        action,
        validationErrors:
          state.status === 'error' ? { email: state.error } : {},
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
