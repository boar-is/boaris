'use client'

import { type PropsWithChildren, useContext, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'sonner'
import { OverlayTriggerStateContext } from '~/components/dialog'
import { FormContext } from '~/components/form'
import { subscribe } from '~/lib/actions/subscribe'

export function SubscriptionFormProvider({ children }: PropsWithChildren) {
  const [state, action] = useFormState(subscribe, {
    status: 'initial',
  })

  const { close } = useContext(OverlayTriggerStateContext)

  useEffect(() => {
    if (state.status === 'success') {
      close()
      toast.success(`Confirmation email sent to ${state.email}`, {
        description: 'Please, check your inbox and spam folders',
        duration: 10e3,
      })
    }
  }, [state.status])

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
