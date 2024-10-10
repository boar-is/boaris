'use client'

import { type PropsWithChildren, useContext, useMemo } from 'react'
import { OverlayTriggerStateContext } from 'react-aria-components'
import { ButtonContext } from '~/src/components/button'

export {
  DialogTrigger,
  Dialog,
  DialogContext,
  OverlayTriggerStateContext,
} from 'react-aria-components'

export function CloseDialogButtonProvider({ children }: PropsWithChildren) {
  const { close } = useContext(OverlayTriggerStateContext)

  const value = useMemo(() => ({ onPress: close }), [close])

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  )
}
