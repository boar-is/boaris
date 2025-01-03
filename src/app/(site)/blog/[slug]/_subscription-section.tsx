'use client'

import { Button } from '~/lib/buttons/button'
import { FieldError, Form } from '~/lib/forms/form'
import { PendingFormDisabledButtonProvider } from '~/lib/forms/pending-form-disabled-button-provider'
import { Input, Label, TextField } from '~/lib/forms/text-field'
import { cx } from '~/lib/react/cx'
import { shadowInsetStyles } from '~/lib/surfaces/shadow-inset-styles'
import { PostSubscriptionSectionFormProvider } from './_subscription-section-form-modal'

export function PostSubscriptionSection() {
  return (
    <article
      className={cx(
        shadowInsetStyles,
        '~space-y-6/8 max-w-xl ~text-base/lg mx-auto ~rounded-4xl/5xl after:~rounded-4xl/5xl ~p-6/8 bg-clip-padding border border-white/10 bg-gradient-to-br from-gray-2/75 to-gray-1/75 backdrop-saturate-150 backdrop-blur-lg drop-shadow-md',
      )}
    >
      <header>
        <h2 className="~text-3xl/4xl font-semibold">Like the format?</h2>
      </header>
      <section className="text-gray-11 font-medium text-pretty ~space-y-4/6">
        <p>
          OR CONTACT ME Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Esse, eveniet hic laudantium nam nesciunt nisi odit qui sapiente
          velit voluptates? Ad aperiam consequatur culpa dolor ipsum neque quia
          similique vitae?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          aliquid delectus deserunt ducimus eius illum odio optio provident
          reprehenderit velit. Aliquam amet cupiditate delectus dolor, dolore
          dolores numquam officiis quia.
        </p>
      </section>
      <PostSubscriptionSectionFormProvider>
        <Form className="flex flex-col gap-4">
          <TextField
            name="email"
            type="email"
            isRequired
            autoFocus
            className="flex w-full flex-col gap-1"
          >
            <Label className="text-gray-11">Email</Label>
            <Input
              placeholder="person@cool-domain.com"
              className="rounded-xl border border-accent-7 focus:border-accent-8 text-accent-11 bg-accent-2 ~px-3/4 ~py-1/2 ~text-lg/xl placeholder-accent-5 transition-colors"
            />
            <FieldError className="text-destructive-9 text-sm" />
          </TextField>
          <PendingFormDisabledButtonProvider>
            <Button
              type="submit"
              intent="primary"
              className="rounded-xl ~text-base/lg"
            >
              Subscribe
            </Button>
          </PendingFormDisabledButtonProvider>
        </Form>
      </PostSubscriptionSectionFormProvider>
    </article>
  )
}
