'use client'

import { useFocusVisibleListener } from '@react-aria/interactions'

export function FocusVisibleProvider() {
  useFocusVisibleListener((isFocusVisible) => {
    document.body.classList.toggle('focus-visible', isFocusVisible)
  }, [])

  return null
}
