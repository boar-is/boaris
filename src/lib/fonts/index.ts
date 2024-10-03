import localFont from 'next/font/local'

export const Switzer = localFont({
  variable: '--font-switzer',
  src: [
    {
      path: './Switzer-Variable.ttf',
      style: 'normal',
    },
  ],
})

export const JetBrainsMono = localFont({
  variable: '--font-jetbrains-mono',
  src: [
    {
      path: './JetBrainsMono-Variable.ttf',
      style: 'normal',
    },
  ],
})
