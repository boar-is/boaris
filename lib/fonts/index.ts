import localFont from 'next/font/local'

export const Switzer = localFont({
  variable: '--font-switzer',
  src: [
    {
      path: './Switzer-Variable.ttf',
      style: 'normal',
    },
    {
      path: './Switzer-VariableItalic.ttf',
      style: 'italic',
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
    {
      path: './JetBrainsMono-VariableItalic.ttf',
      style: 'italic',
    },
  ],
})
