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

export async function addArtistToListAction(
  artist: ArtistDto,
  eventId: string
) {
  const { data } = await addArtistToEvent({
    path: {
      event_id: eventId,
    },
    body: {
      artist_id: artist.id,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
  return data;
}

export async function removeArtistFromListAction(
  artist: ArtistDto,
  eventId: string
) {
  const { data } = await removeArtistFromEvent({
    path: {
      event_id: eventId,
    },
    body: {
      artist_id: artist.id,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
  return data;
}

export async function setTimeslotMarkerAction(
  eventId: string,
  timeDisplay: string,
  slotIndex: number
) {
  const { data } = await setTimeslot({
    path: {
      event_id: eventId,
    },
    body: {
      slot_index: slotIndex,
      time_display: timeDisplay,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
  return data;
}

export async function deleteTimeslotMarkerAction(
  eventId: string,
  timeslotMarkerId: string
) {
  const { data } = await deleteTimeslot({
    path: {
      event_id: eventId,
    },
    body: {
      timeslot_marker_id: timeslotMarkerId,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
  return data;
}

export async function setSortOrderAction(
  eventId: string,
  args: {
    currentTimeSlotId: string;
    beforeTimeSlotId?: string;
    afterTimeSlotId?: string;
  }
) {
  await setSortOrder({
    path: {
      event_id: eventId,
    },
    body: {
      before_slot_id: args.beforeTimeSlotId,
      current_slot_id: args.currentTimeSlotId,
      after_slot_id: args.afterTimeSlotId,
    },
  });

  revalidatePath(`/admin/events/${eventId}`);
}
