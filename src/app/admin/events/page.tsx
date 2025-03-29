import { getEvents } from "@/client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { AddEventDialog } from "./components/add-dialog";
import { EventListComponent } from "./components/list-item";

export default async function AdminEventsPage() {
  const { data, error } = await getEvents();

  if (error) {
    return <div>Error loading events</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between pb-12">
        <div className="text-4xl font-bold">Events</div>
        <AddEventDialog />
      </div>
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
              return <EventListComponent key={event.id} event={event} />;
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
