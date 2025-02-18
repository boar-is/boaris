'use client'

import { Function, Match } from 'effect'
import { type PropsWithChildren, useActionState, useEffect } from 'react'
import { ButtonContext } from 'react-aria-components'
import { subscriptionAction } from '~/features/subscription-action'
import { FormContext } from '~/lib/forms/form'
import { toast } from '~/lib/toast/toast'

export function SubscriptionFormProvider({ children }: PropsWithChildren) {
  const [state, action, isPending] = useActionState(subscriptionAction, {
    status: 'initial',
  })

  useEffect(() => {
    Match.value(state).pipe(
      Match.when({ status: 'initial' }, Function.constVoid),
      Match.when({ status: 'error' }, (state) => toast.error(state.error)),
      Match.when({ status: 'success' }, (state) =>
        toast.success(`Confirmation email sent to ${state.email}`, {
          description: 'Please, check your inbox and a spam folder',
          duration: 10e3,
        }),
      ),
    )
  }, [state])

  return (
    <FormContext
      value={{
        action,
        validationErrors:
          state.status === 'error' ? { email: state.error } : {},
      }}
    >
      <ButtonContext
        value={{
          isDisabled: isPending,
        }}
      >
        {children}
      </ButtonContext>
    </FormContext>
  )
}
