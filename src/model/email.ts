import { Schema } from 'effect'

export const Email = Schema.String.pipe(
  Schema.pattern(
    /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i,
    {
      message: () => 'Wrong email format',
    },
  ),
)
