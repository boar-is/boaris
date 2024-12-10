'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Button } from '~/lib/buttons/button'

const NewsletterModal = dynamic(
  () => import('~/features/newsletter-modal').then((m) => m.NewsletterModal),
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
        className="~text-sm/base rounded-full h-full"
        onPress={() => setIsOpen(true)}
      >
        Subscribe
      </Button>
      {isOpen && <NewsletterModal isOpen={isOpen} onOpenChange={setIsOpen} />}
    </>
  )
}
