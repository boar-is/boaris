import { Toaster } from 'sonner'
import { cx } from '~/lib/react/cx'

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      toastOptions={{
        classNames: {
          toast: cx(
            'bg-bg text-fg ring-1 ring-border dark:ring-inset font-sans rounded-xl',
          ),
          title: cx('font-semibold'),
        },
      }}
    />
  )
}
