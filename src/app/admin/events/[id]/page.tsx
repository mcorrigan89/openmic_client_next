import { getAllArtists, getEvent } from "@/client";
import { Divider } from "@/components/divider";
import { differenceInSeconds, format, secondsToMinutes } from "date-fns";
import { AdminListComponent } from "./components/list";
import { ArtistSearch } from "./components/artist-search";
import { TZDate } from "@date-fns/tz";

interface EventPageProps {
  params: Promise<{
    id: string; // This is the artistId
  }>;
}

export default async function AdminEventPage({ params }: EventPageProps) {
  const eventId = (await params).id;
  const { data: eventData, error: eventError } = await getEvent({
    path: { id: eventId },
  });
  const { data: artistData, error: artistError } = await getAllArtists();
  if (eventError || artistError) {
    return <div>Error loading events</div>;
  }

  if (!eventData || !artistData) {
    return <div>Loading...</div>;
  }

  let eventType = "";
  switch (eventData.event_type) {
    case "OPEN_MIC":
      eventType = "Open Mic";
      break;
    case "ARTIST_SHOWCASE":
      eventType = "Artist Showcase";
      break;
  }

  const startDate = format(
    new TZDate(eventData.start_time, "America/Chicago"),
    "EEEE, MMMM do yyy"
  );

  const startTime = format(
    new TZDate(eventData.start_time, "America/Chicago"),
    "h:mma"
  );
  const endTime = format(
    new TZDate(eventData.end_time, "America/Chicago"),
    "h:mma"
  );
  const listCount = eventData.time_slots ? eventData.time_slots.length : 0;
  const estimatedSecondsPerArtist =
    differenceInSeconds(eventData.end_time, eventData.start_time) / listCount;

  return (
    <div>
      <div className="flex flex-col gap-4 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="text-2xl font-semibold">{eventType}</div>
          <div className="text-lg font-semibold">{startDate}</div>
        </div>
        <Divider />
      </div>
      <div className="flex flex-col gap-4 pb-4">
        <div className="flex gap-4 justify-between">
          <span>
            {startTime} - {endTime}
          </span>
          <span>Count: {listCount}</span>
          <span>
            Est: {secondsToMinutes(estimatedSecondsPerArtist)} minutes per set
          </span>
        </div>
        <Divider />
      </div>

      <div>
        {eventData.time_slots ? (
          <AdminListComponent
            artists={artistData}
            markers={eventData.time_markers ?? []}
            timeslots={eventData.time_slots}
            eventId={eventData.id}
            eventType={eventData.event_type}
          />
        ) : null}
      </div>
    </div>
  );
}
