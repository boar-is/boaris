'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Button } from '~/lib/buttons/button'

const SubscriptionModal = dynamic(
  () =>
    import('~/features/subscription-modal').then((m) => m.SubscriptionModal),
  {
    ssr: false,
  },
)

export function CtaModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        intent="primary"
        className="~text-sm/base rounded-xl h-full"
        onPress={() => setIsOpen(true)}
      >
        Subscribe
      </Button>
      {isOpen && <SubscriptionModal isOpen={isOpen} onOpenChange={setIsOpen} />}
    </>
  )
}
