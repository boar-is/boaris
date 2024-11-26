import { Toaster } from 'sonner'
import { cx } from '~/lib/react/cx'

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      toastOptions={{
        classNames: {
          toast: cx(
            'bg-gray-2 text-gray-12 outline-1 outline-gray-6 font-sans rounded-xl',
          ),
          title: cx('font-semibold'),
        },
      }}
    />
  )
}
