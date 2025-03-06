"use server";

import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { formOpts } from "./shared";
import { revalidatePath } from "next/cache";
import { createArtist } from "@/client";

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (!value.title) {
      return "Title cannot be blank";
    }
  },
});

export async function addArtistAction(prev: unknown, formData: FormData) {
  console.log(formData);
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  await createArtist({
    body: {
      title: formData.get("title") as string,
      sub_title: (formData.get("subtitle") as string) ?? null,
      bio: (formData.get("bio") as string) ?? null,
    },
  });

  revalidatePath("/admin/artists");

  // Your form has successfully validated!
}
