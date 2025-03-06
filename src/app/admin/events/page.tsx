import { EventDto, getEvents } from "@/client";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Button } from "@/components/button";
import { format } from "date-fns";
import clsx from "clsx";

interface EventComponentProps {
  event: EventDto;
}

function EventComponent({ event }: EventComponentProps) {
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
    </TableRow>
  );
}

export default async function AdminEventsPage() {
  const { data, error } = await getEvents();

  if (error) {
    return <div>Error loading events</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>Events</div>
      <div>
        <Table
          striped
          className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
        >
          <TableHead>
            <TableRow>
              <TableHeader>Event Type</TableHeader>
              <TableHeader className="hidden md:block">Date</TableHeader>
              <TableHeader>Go to admin page</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((event) => {
              return <EventComponent key={event.id} event={event} />;
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
