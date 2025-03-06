import { getEvent } from "@/client";
import { HeaderSlim } from "@/components/header";
import { ListComponent } from "@/components/list";

export default async function NowPlayingPage() {
  const { data, error } = await getEvent({
    path: { id: "3bf9b8d0-c1ed-4be0-a3da-4b9e7bf611b4" },
  });

  if (error) {
    return <div>Error loading events</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto w-full lg:w-2/3 xl:w-1/2 h-screen overflow-hidden">
      <HeaderSlim />
      <div className="h-8" />
      {data.time_slots ? <ListComponent timeslots={data.time_slots} /> : null}
    </div>
  );
}
