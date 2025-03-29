"use client";
import { EventDto } from "@/client";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/table";
import { Button } from "@/components/button";
import { format } from "date-fns";
import clsx from "clsx";
import { deleteEventAction } from "./action";

interface EventComponentProps {
  event: EventDto;
}

export function EventListComponent({ event }: EventComponentProps) {
  const startDate = format(event.start_time, "EEE MMMM do");

  let eventType = "";
  let eventTypeColor = "";
  switch (event.event_type) {
    case "OPEN_MIC":
      eventType = "Open Mic";
      eventTypeColor = "text-red-800 dark:text-red-500";
      break;
    case "ARTIST_SHOWCASE":
      eventType = "Artist Showcase";
      eventTypeColor = "text-emerald-800 dark:text-emerald-500";
      break;
  }

  return (
    <TableRow key={event.id}>
      <TableCell className={clsx("font-medium", eventTypeColor)}>
        {eventType}
      </TableCell>
      <TableCell className="hidden md:block">{startDate}</TableCell>
      <TableCell className="text-zinc-500">
        <Link href={`/admin/events/${event.id}`}>
          <Button outline>View</Button>
        </Link>
      </TableCell>
      <TableCell className="text-zinc-500">
        <Button outline onClick={() => deleteEventAction(event.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
