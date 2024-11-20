'use client'

import { Button, getButtonProps } from '~/lib/buttons/button'

export default function LabsPage() {
  const [buttonProps, buttonIconProps] = getButtonProps({
    isDisabled: true,
  })
  return (
    <div className="container">
      <Button {...buttonProps}>Label</Button>
    </div>
  )
}
