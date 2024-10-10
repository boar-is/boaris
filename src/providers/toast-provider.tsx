import { Toaster } from 'sonner'
import { cx } from '~/src/lib/cx'

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      toastOptions={{
        classNames: {
          toast: cx('bg-gray-2 text-gray-11 border-gray-6 font-sans'),
          title: cx('font-semibold'),
        },
      }}
    />
  )
}
