"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { formOpts } from "./shared";
import { revalidatePath } from "next/cache";
import { createEvent, deleteEvent } from "@/client";
import { addHours, addMinutes, setHours } from "date-fns";
import { tz, TZDate } from "@date-fns/tz";

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

  const eventType = formData.get("type") as string;

  const startDateString = formData.get("date") as string;
  const startDate = new Date(startDateString);
  const tzStartDate = tz("America/Chicago")(startDate);

  let tzDateTime: TZDate;
  let tzEndDateTime: TZDate;
  if (eventType === "OPEN_MIC") {
    tzDateTime = setHours(tzStartDate, 18);
    tzEndDateTime = addHours(tzDateTime, 5);
  } else {
    tzDateTime = setHours(tzStartDate, 19);
    tzEndDateTime = addHours(tzDateTime, 2);
    tzEndDateTime = addMinutes(tzEndDateTime, 30);
  }

  await createEvent({
    body: {
      event_type: eventType,
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
