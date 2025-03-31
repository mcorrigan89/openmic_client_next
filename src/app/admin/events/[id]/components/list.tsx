"use client";

import { ArtistDto, TimeslotDto, TimesMarkerDto } from "@/client";
import { Button } from "@/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import {
  setSortOrderAction,
  removeArtistFromListAction,
  setTimeslotMarkerAction,
  deleteTimeslotMarkerAction,
  setSongCountAction,
  setNowPlayingAction,
} from "./action";
import { format } from "date-fns";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/dropdown";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { ArtistSearch } from "./artist-search";
import { Input } from "@/components/input";
import clsx from "clsx";
import { TZDate } from "@date-fns/tz";

interface AdminListItemComponentProps {
  eventId: string;
  idx: number;
  timeDisplay: string;
  timeslot: TimeslotDto;
  isPlaying: boolean;
  timeMarkerId?: string;
  setNowPlaying: (eventId: string, slotIndex: number) => void;
  setSongCount: (
    eventId: string,
    timeslotId: string,
    songCount: number
  ) => void;
  setTimeForTimeslot: (time: string, slotIndex: number) => void;
  deleteTimeslotMarker: (timeslotMarkerId?: string) => void;
  removeArtistFromList: (artist: ArtistDto, eventId: string) => void;
}

function ListItem({
  eventId,
  idx,
  timeslot,
  timeDisplay,
  isPlaying,
  timeMarkerId,
  setNowPlaying,
  setSongCount,
  setTimeForTimeslot,
  deleteTimeslotMarker,
  removeArtistFromList,
}: AdminListItemComponentProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: timeslot.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow key={timeslot.id} ref={setNodeRef} style={style}>
      <TableCell {...attributes} {...listeners}>
        <Squares2X2Icon className="h-10 lg:h-6 cursor-grab" />
      </TableCell>
      <TableCell className="font-medium">{timeslot.artist.title}</TableCell>
      {/* <TableCell className="hidden md:table-cell">
        {timeslot.artist.title}
      </TableCell> */}
      <TableCell className="hidden md:table-cell">
        {format(new TZDate(timeslot.time_display, "America/Chicago"), "h:mm")}
      </TableCell>
      <TableCell className="w-4">
        <Dropdown>
          <DropdownButton outline className="z-10">
            {timeslot.song_count}
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu>
            <DropdownItem onClick={() => setSongCount(eventId, timeslot.id, 1)}>
              1
            </DropdownItem>
            <DropdownItem onClick={() => setSongCount(eventId, timeslot.id, 2)}>
              2
            </DropdownItem>
            <DropdownItem onClick={() => setSongCount(eventId, timeslot.id, 3)}>
              3
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </TableCell>
      <TableCell>
        {isPlaying ? (
          <Button
            className="w-24 cursor-pointer"
            color={"emerald"}
            onClick={() => setNowPlaying(eventId, idx)}
          >
            Playing
          </Button>
        ) : (
          <Button
            className="w-24 cursor-pointer"
            outline
            onClick={() => setNowPlaying(eventId, idx)}
          >
            Set Now
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Dropdown>
          <DropdownButton outline className="z-10">
            {timeDisplay}
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu>
            <DropdownItem onClick={() => setTimeForTimeslot("6pm", idx)}>
              6pm
            </DropdownItem>
            <DropdownItem onClick={() => setTimeForTimeslot("7ish", idx)}>
              7ish
            </DropdownItem>
            <DropdownItem onClick={() => setTimeForTimeslot("8ish", idx)}>
              8ish
            </DropdownItem>
            <DropdownItem onClick={() => setTimeForTimeslot("9ish", idx)}>
              9ish
            </DropdownItem>
            <DropdownItem onClick={() => setTimeForTimeslot("10ish", idx)}>
              10ish
            </DropdownItem>
            <DropdownItem onClick={() => deleteTimeslotMarker(timeMarkerId)}>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </TableCell>
      <TableCell className="text-zinc-500">
        <Button
          onClick={() => removeArtistFromList(timeslot.artist, eventId)}
          outline
          className="cursor-pointer"
        >
          <XMarkIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface AdminListComponentProps {
  eventId: string;
  markers: TimesMarkerDto[];
  timeslots: TimeslotDto[];
  artists: ArtistDto[];
}

export function AdminListComponent({
  timeslots,
  markers,
  eventId,
  artists,
}: AdminListComponentProps) {
  const [items, setItems] = useState(timeslots);

  const setTimeForTimeslot = async (time: string, slotIndex: number) => {
    const eventDto = await setTimeslotMarkerAction(eventId, time, slotIndex);
    if (eventDto?.time_slots) {
      setItems(eventDto.time_slots);
    }
  };

  const deleteTimeslotMarker = async (timeslotMarkerId?: string) => {
    if (timeslotMarkerId) {
      const eventDto = await deleteTimeslotMarkerAction(
        eventId,
        timeslotMarkerId
      );
      if (eventDto?.time_slots) {
        setItems(eventDto.time_slots);
      }
    }
  };

  const removeArtistFromList = async (artist: ArtistDto, eventId: string) => {
    const eventDto = await removeArtistFromListAction(artist, eventId);
    if (eventDto?.time_slots) {
      setItems(eventDto.time_slots);
    }
  };

  const setSongCount = async (
    eventId: string,
    timeslotId: string,
    songCount: number
  ) => {
    const eventDto = await setSongCountAction(eventId, timeslotId, songCount);
    if (eventDto?.time_slots) {
      setItems(eventDto.time_slots);
    }
  };

  const setNowPlaying = async (eventId: string, slotIndex: number) => {
    const eventDto = await setNowPlayingAction(eventId, slotIndex);
    if (eventDto?.time_slots) {
      setItems(eventDto.time_slots);
    }
  };

  const timeMarkerFromIndex = (index: number) =>
    markers.find(
      (marker) => marker.slot_index === index && marker.type === "TIME"
    );

  const playingMarkerFromIndex = (index: number) =>
    markers.find(
      (marker) => marker.slot_index === index && marker.type === "PLAYING"
    );

  const timeDisplay = (index: number) => {
    const marker = timeMarkerFromIndex(index);
    return marker?.display ?? "--";
  };

  const playingDisplay = (index: number) => {
    const marker = playingMarkerFromIndex(index);
    return !!marker;
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => {
        return arrayMove(items, oldIndex, newIndex);
      });

      if (oldIndex < newIndex) {
        await setSortOrderAction(eventId, {
          currentTimeSlotId: active.id as string,
          beforeTimeSlotId: over.id as string,
        });
      } else {
        await setSortOrderAction(eventId, {
          currentTimeSlotId: active.id as string,
          afterTimeSlotId: over.id as string,
        });
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex gap-4 justify-center">
        <ArtistSearch
          artists={artists}
          eventId={eventId}
          updateTimeSlots={(eventDto) => {
            if (eventDto?.time_slots) {
              setItems(eventDto.time_slots);
            }
          }}
        />
      </div>
      <DndContext
        id="timeslot-list"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table
          striped
          className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
        >
          <TableHead>
            <TableRow>
              <TableHeader>Grab</TableHeader>
              <TableHeader>Title</TableHeader>
              {/* <TableHeader className="hidden md:table-cell">
              Title Override
            </TableHeader> */}
              <TableHeader className="hidden md:table-cell">
                Est. Time
              </TableHeader>
              <TableHeader>Songs</TableHeader>
              <TableHeader>Time</TableHeader>
              <TableHeader>Remove</TableHeader>
            </TableRow>
          </TableHead>

          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <TableBody>
              {items.map((timeslot, idx) => (
                <ListItem
                  key={timeslot.id}
                  eventId={eventId}
                  idx={idx}
                  timeslot={timeslot}
                  timeDisplay={timeDisplay(idx)}
                  isPlaying={playingDisplay(idx)}
                  timeMarkerId={timeMarkerFromIndex(idx)?.id}
                  setSongCount={setSongCount}
                  setNowPlaying={setNowPlaying}
                  setTimeForTimeslot={setTimeForTimeslot}
                  deleteTimeslotMarker={deleteTimeslotMarker}
                  removeArtistFromList={removeArtistFromList}
                />
              ))}
            </TableBody>
          </SortableContext>
        </Table>
      </DndContext>
    </div>
  );
}
