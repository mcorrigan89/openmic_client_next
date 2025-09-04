"use client";

import { Button } from "@/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from "@/components/dialog";
import { useState, useActionState } from "react";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useStore } from "@tanstack/react-store";
import { addEventAction } from "./action";
import { formOpts } from "./shared";
import { Field, Label } from "@/components/fieldset";
import { Select } from "@/components/select";
import { DatePicker } from "./date-picker";

export function AddEventDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(addEventAction, initialFormState);

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
        Add New Event
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <form action={action} onSubmit={() => form.handleSubmit()}>
          <DialogTitle>Create a new event</DialogTitle>
          {/* <DialogDescription>
            The refund will be reflected in the customer’s bank account 2 to 3
            business days after processing.
          </DialogDescription> */}
          <DialogBody>
            {formErrors.map((error) => (
              <p key={error as unknown as string}>{error}</p>
            ))}

            <form.Field name="type">
              {(field) => {
                return (
                  <Field className="">
                    <Label>Event</Label>
                    <Select
                      name="type"
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option value="OPEN_MIC">
                        Open Mic at Sociable Cider
                      </option>
                      <option value="ARTIST_SHOWCASE">Showcase</option>
                      <option value="OPEN_MIC_FAIR">
                        Open Mic at Fair State
                      </option>
                    </Select>
                  </Field>
                );
              }}
            </form.Field>

            <form.Field
              name="date"
              children={({ state, setValue }) => (
                <>
                  <input
                    defaultValue={state.value?.toISOString()}
                    className="hidden"
                    type="text"
                    name="date"
                  />
                  <DatePicker
                    selectedDate={state.value}
                    onSelectDate={(date) => setValue(date)}
                  />
                </>
              )}
            />

            <form.Subscribe
              selector={(formState) => [
                formState.canSubmit,
                formState.isSubmitting,
              ]}
            >
              {([canSubmit, isSubmitting]) => (
                <>
                  <DialogActions className="flex">
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
