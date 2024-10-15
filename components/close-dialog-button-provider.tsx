'use client'

import { type PropsWithChildren, useContext, useMemo } from 'react'
import { ButtonContext } from '~/src/primitives/button'
import { OverlayTriggerStateContext } from '~/src/primitives/dialog'

export function CloseDialogButtonProvider({ children }: PropsWithChildren) {
  const { close } = useContext(OverlayTriggerStateContext)

  const value = useMemo(() => ({ onPress: close }), [close])

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  )
}
