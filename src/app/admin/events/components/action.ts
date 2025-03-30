"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { formOpts } from "./shared";
import { revalidatePath } from "next/cache";
import { createEvent, deleteEvent } from "@/client";
import { addHours, setHours } from "date-fns";
import { tz } from "@date-fns/tz";

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (!value.type) {
      return "Type cannot be blank";
    }
    if (!value.date) {
      return "Date cannot be blank";
    }
  },
});

export async function addEventAction(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  const startDateString = formData.get("date") as string;
  const startDate = new Date(startDateString);
  const tzStartDate = tz("America/Chicago")(startDate);
  console.log("TZ START DATE", tzStartDate);
  const tzDateTime = setHours(tzStartDate, 12);
  const tzEndDateTime = addHours(tzDateTime, 5);

  await createEvent({
    body: {
      event_type: formData.get("type") as string,
      start_time: tzDateTime.toISOString(),
      end_time: tzEndDateTime.toISOString(),
    },
  });

  revalidatePath("/admin/artists");
}

export async function deleteEventAction(eventId: string) {
  await deleteEvent({
    path: {
      id: eventId,
    },
  });

  revalidatePath("/admin/artists");
}
