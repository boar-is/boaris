'use client'

import { Button } from '~/lib/buttons/button'
import { ArrowUpFromDotIcon } from '~/lib/media/icons'

export function ButtonJumpToTop() {
  return (
    <Button
      intent="tertiary"
      size="lg"
      onPress={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex items-center gap-1.5 mx-auto"
    >
      <ArrowUpFromDotIcon className="size-5" />
      Jump to Top
    </Button>
  )
}
