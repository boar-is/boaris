import type { ComponentPropsWithoutRef } from 'react'

export {
  NanoTechnologyIcon as BrandIcon,
  Menu09Icon as MenuIcon,
  Cancel01Icon as CloseIcon,
} from 'hugeicons-react'

type SvgIconProps = ComponentPropsWithoutRef<'svg'>

export function GitHubIcon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <title>GitHub</title>
      <path d="M10 0c5.52 0 10 4.59 10 10.25 0 4.53-2.86 8.37-6.83 9.73-.51.1-.69-.22-.69-.5l.01-2.8c0-.96-.32-1.58-.68-1.9 2.23-.26 4.57-1.12 4.57-5.06a4 4 0 0 0-1.03-2.75c.1-.26.45-1.3-.1-2.72 0 0-.84-.27-2.75 1.05a9.4 9.4 0 0 0-5 0C5.59 3.98 4.75 4.25 4.75 4.25a3.78 3.78 0 0 0-.1 2.72 4.03 4.03 0 0 0-1.03 2.75c0 3.93 2.33 4.8 4.55 5.06-.28.26-.54.71-.63 1.38-.57.26-2.02.71-2.91-.86 0 0-.53-.98-1.53-1.05 0 0-.98-.02-.07.62 0 0 .65.32 1.1 1.5 0 0 .6 1.83 3.38 1.21l.01 1.9c0 .28-.18.6-.68.5A10.23 10.23 0 0 1 0 10.25C0 4.6 4.48 0 10 0" />
    </svg>
  )
}

export function LinkedInIcon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 256 256" {...props}>
      <title>LinkedIn</title>
      <path d="M218 218h-38v-59c0-14 0-33-20-33-19 0-22 16-22 32v60h-38V96h36v17h1a40 40 0 0 1 36-20c38 0 45 25 45 58v67ZM57 79a22 22 0 1 1 22-22 22 22 0 0 1-22 22m19 139H38V96h38v122ZM237 0H19C9 0 0 8 0 18v220c0 10 9 18 19 18h218c10 0 19-8 19-18V18c0-10-9-18-19-18" />
    </svg>
  )
}

export function XIcon(props: SvgIconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 1200 1227" {...props}>
      <title>X</title>
      <path
        fill="currentColor"
        d="M714 519 1161 0h-106L667 451 357 0H0l468 682L0 1226h106l409-476 328 476h357L714 519ZM569 688l-47-68L144 80h163l304 436 48 68 396 566H892L569 688Z"
      />
    </svg>
  )
}
