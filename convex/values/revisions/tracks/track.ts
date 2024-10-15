import { v } from 'convex/values'
import { dynamicImageTrack } from './dynamicImageTrack'
import { staticImageTrack } from './staticImageTrack'
import { textTrack } from './textTrack'

export const track = v.union(dynamicImageTrack, staticImageTrack, textTrack)

export type Track = typeof track.type
