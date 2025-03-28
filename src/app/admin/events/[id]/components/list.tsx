"use client";

import { TimeslotDto, TimesMarkerDto } from "@/client";
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
  removeArtistFromList,
  setTimeslotMarkerAction,
  deleteTimeslotMarkerAction,
} from "./action";
import { format } from "date-fns";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
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

interface AdminListItemComponentProps {
  eventId: string;
  idx: number;
  timeDisplay: string;
  timeslot: TimeslotDto;
  markerId?: string;
  setTimeForTimeslot: (time: string, slotIndex: number) => void;
  deleteTimeslotMarker: (timeslotMarkerId?: string) => void;
}

function ListItem({
  eventId,
  idx,
  timeslot,
  timeDisplay,
  markerId,
  setTimeForTimeslot,
  deleteTimeslotMarker,
}: AdminListItemComponentProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: timeslot.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      key={timeslot.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TableCell className="font-medium">{timeslot.artist.title}</TableCell>
      <TableCell className="hidden md:table-cell">
        {timeslot.artist.title}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {format(timeslot.time_display, "h:mm")}
      </TableCell>
      <TableCell>
        <Dropdown>
          <DropdownButton outline>
            {timeDisplay}
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu>
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
            <DropdownItem onClick={() => deleteTimeslotMarker(markerId)}>
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
}

export function AdminListComponent({
  timeslots,
  markers,
  eventId,
}: AdminListComponentProps) {
  const [items, setItems] = useState(timeslots);

  const setTimeForTimeslot = async (time: string, slotIndex: number) => {
    await setTimeslotMarkerAction(eventId, time, slotIndex);
  };

  const deleteTimeslotMarker = async (timeslotMarkerId?: string) => {
    if (timeslotMarkerId) {
      await deleteTimeslotMarkerAction(eventId, timeslotMarkerId);
    }
  };

  const markerFromIndex = (index: number) =>
    markers.find((marker) => marker.slot_index === index);

  const timeDisplay = (index: number) =>
    markerFromIndex(index)?.time_display ?? "--";

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active?.id && over?.id && active.id !== over.id) {
      await setSortOrderAction(eventId, active.id as string, over.id as string);
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
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
            <TableHeader>Title</TableHeader>
            <TableHeader className="hidden md:table-cell">
              Title Override
            </TableHeader>
            <TableHeader className="hidden md:table-cell">
              Est. Time
            </TableHeader>
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
                markerId={markerFromIndex(idx)?.id}
                setTimeForTimeslot={setTimeForTimeslot}
                deleteTimeslotMarker={deleteTimeslotMarker}
              />
            ))}
          </TableBody>
        </SortableContext>
      </Table>
    </DndContext>
  );
}
