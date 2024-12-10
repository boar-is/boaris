import type { PropsWithChildren } from 'react'
import { matchFileTypeIcon } from '~/lib/media/match-file-type-icon'
import { cx } from '~/lib/react/cx'

const edgeCx = cx(
  'bg-accent-1/40 text-gray-11 font-medium py-2 px-3.5 text-xs flex items-center gap-1.5 z-10 tracking-wide',
)

export function PostLayoutPanelHeader({ name }: { name: string }) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <header className={edgeCx}>
      <FileTypeIcon className="size-4 text-accent-11" />
      {name.split('/').pop()}
    </header>
  )
}

export function PostLayoutPanelFooter({ children }: PropsWithChildren) {
  return <footer className={edgeCx}>{children}</footer>
}
