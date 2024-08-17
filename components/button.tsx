'use client'

import { type PropsWithChildren, useMemo } from 'react'
import { ButtonContext } from 'react-aria-components'
import { useFormStatus } from 'react-dom'

export {
  Button,
  type ButtonProps,
  ButtonContext,
  ToggleButton,
  ToggleButtonContext,
} from 'react-aria-components'

export function PendingFormDisabledButtonProvider({
  children,
}: PropsWithChildren) {
  const { pending } = useFormStatus()

  const value = useMemo(() => ({ isDisabled: pending }), [pending])

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  )
}
