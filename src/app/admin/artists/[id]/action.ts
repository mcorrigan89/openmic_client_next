"use server";

import { revalidatePath } from "next/cache";
import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form/nextjs";
import { formOpts } from "./shared";
import { updateArtist } from "@/client";

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    if (!value.artistTitle) {
      return "Artist title cannot be blank";
    }
  },
});

export async function editArtistAction(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }

  const artistId = formData.get("artistID") as string;
  const artistTitle = formData.get("artistTitle") as string;
  const artistSubTitle = formData.get("artistSubTitle") as string;

  await updateArtist({
    path: {
      id: artistId,
    },
    body: {
      title: artistTitle,
      sub_title: artistSubTitle,
      bio: "",
    },
  });

  revalidatePath(`/admin/artists/${artistId}`);
}
