import type { PropsWithChildren } from 'react'
import { matchFileTypeIcon } from '~/lib/media/match-file-type-icon'
import { cx } from '~/lib/react/cx'

const edgeCx = cx(
  'bg-accent-1/60 font-medium ~py-1/2.5 ~px-3.5/4  flex items-center ~gap-1/1.5 z-10 tracking-wide',
)

export function PostLayoutPanelHeader({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  const FileTypeIcon = matchFileTypeIcon(name)

  return (
    <header className={cx(edgeCx, 'text-accent-10 ~text-xs/sm')}>
      <FileTypeIcon className="~size-4/5 text-accent-11" />
      {name.split('/').pop()}
      <div className="ml-auto">{children}</div>
    </header>
  )
}

export function PostLayoutPanelFooter({ children }: PropsWithChildren) {
  return (
    <footer className={cx(edgeCx, 'text-gray-11 text-xs')}>{children}</footer>
  )
}
