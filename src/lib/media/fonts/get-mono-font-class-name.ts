import localFont from 'next/font/local'

const JetBrainsMono = localFont({
  variable: '--font-mono',
  src: [
    {
      path: './JetBrainsMono-Variable.ttf',
      style: 'normal',
    },
  ],
})

export const getMonoFontClassName = () => JetBrainsMono.variable
