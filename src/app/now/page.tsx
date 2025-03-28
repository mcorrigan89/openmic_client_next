import { getCurrentEvent } from "@/client";
import { ListComponent } from "@/components/list";

export default async function NowPlayingPage() {
  const { data, error } = await getCurrentEvent();

  if (error) {
    return <div>Error loading events</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto w-full lg:w-2/3 xl:w-1/2">
      <div className="h-8" />
      {data.time_slots ? <ListComponent timeslots={data.time_slots} /> : null}
    </div>
  );
}
