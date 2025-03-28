"use server";

import {
  ArtistDto,
  addArtistToEvent,
  removeArtistFromEvent,
  setTimeslot,
} from "@/client";
import { revalidatePath } from "next/cache";

export async function addArtistToList(artist: ArtistDto, eventId: string) {
  await addArtistToEvent({
    path: {
      event_id: eventId,
    },
    body: {
      artist_id: artist.id,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
}

export async function removeArtistFromList(artist: ArtistDto, eventId: string) {
  await removeArtistFromEvent({
    path: {
      event_id: eventId,
    },
    body: {
      artist_id: artist.id,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
}

export async function setTimeslotAction(
  eventId: string,
  timeDisplay: string,
  slotIndex: number
) {
  console.log(timeDisplay);
  await setTimeslot({
    path: {
      event_id: eventId,
    },
    body: {
      slot_index: slotIndex,
      time_display: timeDisplay,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
}
