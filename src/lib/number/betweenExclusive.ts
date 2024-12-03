import { dual } from 'effect/Function'

export const betweenExclusive: {
  (minimum: number, maximum: number): (self: number) => boolean
  (self: number, minimum: number, maximum: number): boolean
} = dual(
  3,
  (self: number, minimum: number, maximum: number) =>
    minimum < self && self < maximum,
)
