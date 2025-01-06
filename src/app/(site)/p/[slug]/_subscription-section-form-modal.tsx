'use client'

import { type PropsWithChildren, useActionState, useEffect } from 'react'
import { subscriptionAction } from '~/features/subscription-action'
import { FormContext } from '~/lib/forms/form'
import { toast } from '~/lib/toast/toast'

export function PostSubscriptionSectionFormProvider({
  children,
}: PropsWithChildren) {
  const [state, action] = useActionState(subscriptionAction, {
    status: 'initial',
  })

  useEffect(() => {
    if (state.status !== 'success') {
      return
    }

    toast.success(`Confirmation email sent to ${state.email}`, {
      description: 'Please, check your inbox and a spam folder',
      duration: 10e3,
    })
  }, [state])

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
