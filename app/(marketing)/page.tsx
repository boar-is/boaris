'use client'

import { toast } from 'sonner'
import { Button } from '~/components/button'

export default function MarketingPage() {
  return (
    <div className="container px-10 font-semibold text-6xl">
      Marketing Page
      <Button
        onPress={() =>
          toast.success(`Confirmation email sent to ${'boriszubc@gmail.com'}`, {
            description: 'Please, check your inbox and spam folders',
            duration: 100e3,
          })
        }
      >
        clck
      </Button>
    </div>
  )
}
