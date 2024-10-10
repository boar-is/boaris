'use client'

import { type PropsWithChildren, useContext, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { OverlayTriggerStateContext } from '~/app/_primitives/dialog'
import { FormContext } from '~/app/_primitives/form'
import { subscribe } from '~/src/lib/actions/subscribe'

export function SubscriptionFormProvider({ children }: PropsWithChildren) {
  const [state, action] = useFormState(subscribe, {
    status: 'initial',
  })

  const { close } = useContext(OverlayTriggerStateContext)

  useEffect(() => {
    if (state.status === 'success') {
      close()
      toast.success(`Confirmation email sent to ${state.email}`, {
        description: 'Please, check your inbox and a spam folder',
        duration: 10e3,
      })
    }
  }, [state, close])

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
