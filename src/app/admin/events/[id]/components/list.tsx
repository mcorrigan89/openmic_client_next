"use client";

import { TimeslotDto } from "@/client";
import { Button } from "@/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { removeArtistFromList } from "./action";

interface AdminListComponentProps {
  eventId: string;
  timeslots: TimeslotDto[];
}

export function AdminListComponent({
  timeslots,
  eventId,
}: AdminListComponentProps) {
  return (
    <Table
      striped
      className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
    >
      <TableHead>
        <TableRow>
          <TableHeader>Title</TableHeader>
          <TableHeader className="hidden md:block">Title Override</TableHeader>
          <TableHeader>Remove</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {timeslots.map((timeslot) => (
          <TableRow key={timeslot.id}>
            <TableCell className="font-medium">
              {timeslot.artist.title}
            </TableCell>
            <TableCell className="hidden md:block">
              {timeslot.artist.title}
            </TableCell>
            <TableCell className="text-zinc-500">
              <Button
                onClick={() => removeArtistFromList(timeslot.artist, eventId)}
                outline
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
