"use client";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/dialog";
import { useState, useActionState } from "react";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useStore } from "@tanstack/react-store";
import { addArtistAction } from "./action";
import { formOpts } from "./shared";
import { Field, Label } from "@/components/fieldset";
import { Input } from "@/components/input";

export function AddArtistDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(addArtistAction, initialFormState);

  const form = useForm({
    ...formOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state]
    ),
    onSubmit: (props) => {
      props.formApi.reset();
    },
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add New Artist
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form action={action as never} onSubmit={() => form.handleSubmit()}>
          <DialogTitle>Add Artist</DialogTitle>
          <DialogDescription>someone new</DialogDescription>
          <DialogBody>
            {formErrors.map((error) => (
              <p key={error as unknown as string}>{error}</p>
            ))}

            <form.Field name="title">
              {(field) => {
                return (
                  <Field>
                    <Label>Artist Title</Label>
                    <Input
                      name="title"
                      type="text"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="subtitle">
              {(field) => {
                return (
                  <Field>
                    <Label>SubTitle</Label>
                    <Input
                      name="subtitle"
                      type="text"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Field>
                );
              }}
            </form.Field>

            <form.Subscribe
              selector={(formState) => [
                formState.canSubmit,
                formState.isSubmitting,
              ]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  <DialogActions className="flex focus:outline-purple-500">
                    <Button plain onClick={() => setIsOpen(false)}>
                      Close
                    </Button>
                    <Button type="submit" disabled={!canSubmit}>
                      {isSubmitting ? "..." : "Create"}
                    </Button>
                  </DialogActions>
                </>
              )}
            </form.Subscribe>
          </DialogBody>
        </form>
      </Dialog>
    </>
  );
}
