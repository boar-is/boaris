import { Toaster } from 'sonner'
import { cs } from '~/lib/cs'

export function ToastProvider() {
  return (
    <Toaster
      theme="dark"
      toastOptions={{
        classNames: {
          toast: cs('bg-gray-2 text-gray-11 border-gray-6 font-sans'),
          title: cs('font-semibold'),
        },
      }}
    />
  )
}

export { LocalizedStringProvider } from 'react-aria-components/i18n'
