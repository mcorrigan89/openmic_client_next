"use server";

import {
  ArtistDto,
  addArtistToEvent,
  removeArtistFromEvent,
  setTimeslot,
  deleteTimeslot,
  setSortOrder,
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

export async function setTimeslotMarkerAction(
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

export async function deleteTimeslotMarkerAction(
  eventId: string,
  timeslotMarkerId: string
) {
  await deleteTimeslot({
    path: {
      event_id: eventId,
    },
    body: {
      timeslot_marker_id: timeslotMarkerId,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
}

export async function setSortOrderAction(
  eventId: string,
  currentTimeSlotId: string,
  beforeTimeSlotId: string
) {
  await setSortOrder({
    path: {
      event_id: eventId,
    },
    body: {
      before_slot_id: beforeTimeSlotId,
      current_slot_id: currentTimeSlotId,
    },
  });

  // revalidatePath(`/admin/events/${eventId}`);
}
