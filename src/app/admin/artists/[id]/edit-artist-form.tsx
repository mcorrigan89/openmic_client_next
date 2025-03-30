"use client";

import { useActionState } from "react";
import { formOpts } from "./shared";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import { editArtistAction } from "./action";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { Field, Label } from "@/components/fieldset";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ArtistDto } from "@/client";

interface EditArtistFormProps {
  artist: ArtistDto;
}

export function EditArtistForm({ artist }: EditArtistFormProps) {
  const [state, action] = useActionState(editArtistAction, initialFormState);

  const form = useForm({
    ...formOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state]
    ),
    defaultValues: {
      artistID: artist.id,
      artistTitle: artist.title,
      artistSubTitle: artist.sub_title,
    },
    // onSubmit: (props) => {
    //   props.formApi.reset();
    // },
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  return (
    <div>
      <form
        action={action}
        onSubmit={() => form.handleSubmit()}
        className="flex flex-col gap-6 p-8"
      >
        {formErrors.map((error) => (
          <p key={error}>{error}</p>
        ))}

        <form.Field name="artistID">
          {(field) => {
            return (
              <input
                className="hidden"
                name="artistID"
                defaultValue={artist.id}
              />
            );
          }}
        </form.Field>

        <form.Field name="artistTitle">
          {(field) => {
            return (
              <Field className="">
                <Label>Title</Label>
                <Input
                  name="artistTitle"
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name="artistSubTitle">
          {(field) => {
            return (
              <Field className="">
                <Label>Subtitle</Label>
                <Input
                  name="artistSubTitle"
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
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Update"}
              </Button>
            </>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
