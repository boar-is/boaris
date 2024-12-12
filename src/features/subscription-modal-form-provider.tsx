'use client'

import { type PropsWithChildren, use, useActionState, useEffect } from 'react'
import { FormContext } from '~/lib/forms/form'
import { OverlayTriggerStateContext } from '~/lib/overlays/dialog'
import { toast } from '~/lib/toast/toast'
import { subscriptionAction } from './subscription-action'

export function SubscriptionModalFormProvider({ children }: PropsWithChildren) {
  const overlayState = use(OverlayTriggerStateContext)

  if (!overlayState) {
    throw new Error('OverlayTriggerStateContext is null')
  }

  const [state, action] = useActionState(subscriptionAction, {
    status: 'initial',
  })

  useEffect(() => {
    if (!overlayState.isOpen || state.status !== 'success') {
      return
    }

    overlayState.close()
    toast.success(`Confirmation email sent to ${state.email}`, {
      description: 'Please, check your inbox and a spam folder',
      duration: 10e3,
    })
  }, [state, overlayState])

  return (
    <FormContext
      value={{
        action,
        validationErrors:
          state.status === 'error' ? { email: state.error } : {},
      }}
    >
      {children}
    </FormContext>
  )
}
