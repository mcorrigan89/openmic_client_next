import { getCurrentEvent } from "@/client";
import { ListComponent } from "@/app/now/list";
import Link from "next/link";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

export const dynamic = "force-dynamic";

export default async function NowPlayingPage() {
  const { data, error } = await getCurrentEvent();

  if (error) {
    return <div>Error loading event {JSON.stringify(error)}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <div className="text-slate-900 font-bold">No Current Events</div>
        <div>
          <Link href={"/schedule"}>Click Here for Schedule & Info</Link>
        </div>
      </div>
    );
  }

  const date = format(
    new TZDate(data.start_time, "America/Chicago"),
    "MMMM do, yyyy"
  );

  return (
    <div className="container mx-auto w-full lg:w-2/3 xl:w-1/2 p-4">
      <div className="h-8" />
      {data.time_slots ? (
        <ListComponent event={data} dateString={date} />
      ) : null}
    </div>
  );
}
