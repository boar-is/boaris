'use client'

import { type PropsWithChildren, useContext, useMemo } from 'react'
import { ButtonContext } from '~/lib/buttons/button'
import { OverlayTriggerStateContext } from './dialog'

export function CloseDialogButtonProvider({ children }: PropsWithChildren) {
  const state = useContext(OverlayTriggerStateContext)

  if (!state) {
    throw new Error('OverlayTriggerStateContext is null')
  }

  const value = useMemo(() => ({ onPress: state.close }), [state.close])

  return (
    <ButtonContext.Provider value={value}>{children}</ButtonContext.Provider>
  )
}
