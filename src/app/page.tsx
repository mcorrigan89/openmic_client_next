import { EventDto, getEvents } from "@/client";
import { Divider } from "@/components/divider";
import { Header } from "@/components/header";
import { format } from "date-fns";

interface EventComponentProps {
  event: EventDto;
}
function EventComponent({ event }: EventComponentProps) {
  const startDate = format(event.start_time, "EEE MMMM do");
  const startTime = format(event.start_time, "h:mma");
  const endTime = format(event.end_time, "h:mma");

  switch (event.event_type) {
    case "OPEN_MIC":
      return (
        <div>
          <div className="font-semibold text-lg text-emerald-800 dark:text-emerald-500">
            {startDate}
          </div>
          <div className="font-semibold text-red-800 dark:text-red-500">
            OpenMic: {startTime} - {endTime}
          </div>
          {event.event_type}
        </div>
      );
    case "ARTIST_SHOWCASE":
      return (
        <div>
          <div className="font-semibold text-lg text-emerald-800 dark:text-emerald-500">
            {startDate}
          </div>
          <div className="font-semibold text-red-800 dark:text-red-500">
            Artist Showcase
          </div>
          {event.event_type}
        </div>
      );
  }
}

export default async function Home() {
  const { data, error } = await getEvents();
  if (error) {
    console.error(error);
    return <div>Error loading events</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto w-full sm:w-2/3 lg:w-1/2">
      <Header />
      <div className="pt-12 flex gap-4 flex-col">
        {data.map((event) => {
          return (
            <div key={event.id} className="flex flex-col gap-4">
              <EventComponent event={event} />
              <Divider />
            </div>
          );
        })}
      </div>
    </div>
  );
}
