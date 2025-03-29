"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { formOpts } from "./shared";
import { revalidatePath } from "next/cache";
import { createEvent, deleteEvent } from "@/client";

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (!value.type) {
      return "Type cannot be blank";
    }
  },
});

export async function addEventAction(prev: unknown, formData: FormData) {
  console.log("WAT");
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  await createEvent({
    body: {
      event_type: formData.get("type") as string,
      start_time: "2025-03-24T17:00:00Z",
      end_time: "2025-03-24T23:00:00Z",
    },
  });

  revalidatePath("/admin/artists");

  // Your form has successfully validated!
}

export async function deleteEventAction(eventId: string) {
  await deleteEvent({
    path: {
      id: eventId,
    },
  });

  revalidatePath("/admin/artists");
}
