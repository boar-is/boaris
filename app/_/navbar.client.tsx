'use client'

import type { PropsWithChildren } from 'react'
import { type ToggleState, useToggleState } from 'react-stately'
import { ToggleButtonContext } from '~/components/button'
import { createContext } from '~/lib/context'

export type NavbarContextValue = {
  menuToggleState: ToggleState
}

export const [NavbarProvider, useNavbarContext] =
  createContext<NavbarContextValue>()

export function Navbar({ children }: PropsWithChildren) {
  const menuToggleState = useToggleState()

  return (
    <nav>
      <NavbarProvider
        value={{
          menuToggleState,
        }}
      >
        {children}
      </NavbarProvider>
    </nav>
  )
}

export function NavbarMenuButtonProvider({ children }: PropsWithChildren) {
  const {
    menuToggleState: { isSelected, setSelected: onChange },
  } = useNavbarContext()

  return (
    <ToggleButtonContext.Provider value={{ isSelected, onChange }}>
      {children}
    </ToggleButtonContext.Provider>
  )
}
