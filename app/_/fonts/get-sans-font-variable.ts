import localFont from 'next/font/local'

const Switzer = localFont({
  variable: '--font-sans',
  src: [
    {
      path: './Switzer-Variable.ttf',
      style: 'normal',
    },
  ],
})

export const getSansFontVariable = () => Switzer.variable
