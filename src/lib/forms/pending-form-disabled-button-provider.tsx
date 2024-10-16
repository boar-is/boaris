'use client'

import { type PropsWithChildren, useMemo } from 'react'
import { useFormStatus } from 'react-dom'
import { ButtonContext } from '~/lib/buttons/button'

export function PendingFormDisabledButtonProvider({
  children,
}: PropsWithChildren) {
  const { pending } = useFormStatus()

  const value = useMemo(() => ({ isDisabled: pending }), [pending])

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  )
}
