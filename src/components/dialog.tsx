'use client'

import { mergeProps } from '@react-aria/utils'
import { useContext } from 'react'
import { OverlayTriggerStateContext } from 'react-aria-components'
import { Button, type ButtonProps } from '~/src/components/button'

export {
  DialogTrigger,
  Dialog,
  DialogContext,
  OverlayTriggerStateContext,
} from 'react-aria-components'

export function CloseDialogButton(props: ButtonProps) {
  const { close } = useContext(OverlayTriggerStateContext)

  return (
    <Button
      {...mergeProps(props, {
        onPress: close,
      })}
    />
  )
}
