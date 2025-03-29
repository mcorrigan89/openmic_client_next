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

  return (
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
          <TableHeader className="hidden md:table-cell">Est. Time</TableHeader>
          <TableHeader>Time</TableHeader>
          <TableHeader>Remove</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {timeslots.map((timeslot, idx) => (
          <TableRow key={timeslot.id}>
            <TableCell className="font-medium">
              {timeslot.artist.title}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {timeslot.artist.title}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {format(timeslot.time_display, "h:mm")}
            </TableCell>
            <TableCell>
              <Dropdown>
                <DropdownButton outline>
                  {timeDisplay(idx)}
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
                  <DropdownItem
                    onClick={() => setTimeForTimeslot("10ish", idx)}
                  >
                    10ish
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      deleteTimeslotMarker(markerFromIndex(idx)?.id)
                    }
                  >
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
        ))}
      </TableBody>
    </Table>
  );
}
