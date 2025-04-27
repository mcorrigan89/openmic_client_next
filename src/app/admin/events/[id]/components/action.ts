"use server";

import {
  ArtistDto,
  addArtistToEvent,
  removeArtistFromEvent,
  setTimeslotMarker,
  deleteTimeslotMarker,
  setSortOrder,
  updateTimeslot,
  setNowPlaying,
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
export async function setSongCountAction(
  eventId: string,
  timeslotId: string,
  songCount: number
) {
  const { data, error } = await updateTimeslot({
    path: {
      event_id: eventId,
      timeslot_id: timeslotId,
    },
    body: {
      song_count: songCount,
    },
  });

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath(`/admin/events/${eventId}`);
  return data;
}

export async function setTimeslotMarkerAction(
  eventId: string,
  timeDisplay: string,
  slotIndex: number
) {
  const { data } = await setTimeslotMarker({
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
  const { data } = await deleteTimeslotMarker({
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

export async function setNowPlayingAction(eventId: string, slotIndex: number) {
  const { data } = await setNowPlaying({
    path: {
      event_id: eventId,
    },
    body: {
      index: slotIndex,
    },
  });
  revalidatePath(`/admin/events/${eventId}`);
  return data;
}
