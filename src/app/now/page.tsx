import { getCurrentEvent } from "@/client";
import { ListComponent } from "@/app/now/list";
import { redirect } from "next/navigation";
import Link from "next/link";

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
          <Link href={"/schedule"}>Click Here for Schedule</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full lg:w-2/3 xl:w-1/2">
      <div className="h-8" />
      {data.time_slots ? <ListComponent event={data} /> : null}
    </div>
  );
}
