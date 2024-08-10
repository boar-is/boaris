import type { ClassValue } from 'clsx'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cs = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))
