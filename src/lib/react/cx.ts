import { withFluid } from '@fluid-tailwind/tailwind-merge'
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge(withFluid)

export const cx = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))
