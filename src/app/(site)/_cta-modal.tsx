'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Button, type ButtonProps } from '~/lib/buttons/button'

const SubscriptionModal = dynamic(
  () =>
    import('~/features/subscription-modal').then((m) => m.SubscriptionModal),
  {
    ssr: false,
  },
)

export function CtaModal({
  className,
  size,
}: { className?: string | undefined; size?: ButtonProps['size'] | undefined }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        intent="primary"
        className={className ?? ''}
        size={size}
        onPress={() => setIsOpen(true)}
      >
        Subscribe
      </Button>
      {isOpen && <SubscriptionModal isOpen={isOpen} onOpenChange={setIsOpen} />}
    </>
  )
}
