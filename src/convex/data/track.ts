import { v } from 'convex/values'
import { trackImageDynamic } from './trackImageDynamic'
import { trackImageStatic } from './trackImageStatic'
import { trackText } from './trackText'

export const track = v.union(trackImageDynamic, trackImageStatic, trackText)
