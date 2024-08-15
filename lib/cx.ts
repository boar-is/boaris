import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cx = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))
