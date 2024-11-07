'use server'

import { Schema } from 'effect'
import { Email } from '~/model/email'

type SubscribeState =
  | {
      status: 'initial'
    }
  | {
      status: 'success'
      email: string
    }
  | {
      status: 'error'
      error: string
    }

export async function subscribeToNewsletter(
  _: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = formData.get('email') as string

  if (!Schema.is(Email)(email)) {
    return {
      status: 'error',
      error: 'Wrong email format',
    }
  }

  try {
    const res = await fetch(
      `https://api.kit.com/v4/forms/${process.env['KIT_API_FORM_ID']}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${process.env['KIT_API_KEY']}`,
        },
        body: JSON.stringify({
          email_address: email,
        }),
      },
    )

    // biome-ignore lint/suspicious/noExplicitAny: yolo
    if (((await res.json()) as any)['subscriber']?.['id']) {
      return {
        status: 'success',
        email,
      }
    }
  } catch (error) {}
  return {
    status: 'error',
    error: 'Something went wrong',
  }
}
