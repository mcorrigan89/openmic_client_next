import { getCurrentEvent } from "@/client";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data, error } = await getCurrentEvent();
  if (error) {
    return <div>Error loading events {JSON.stringify(error)}</div>;
  }

  if (!data) {
    return redirect("/schedule");
  } else {
    return redirect("/now");
  }
}
