import { TimeslotDto } from "@/client";
import Image from "next/image";

interface TimeslotProps {
  timeslot: TimeslotDto;
}

export function TimeslotComponent({ timeslot }: TimeslotProps) {
  return (
    <div className="flex">
      <div className="w-10 mr-4">
        {timeslot.id === "d6dcb0ef-9be3-4c1c-acfd-cbcd1087b521" ? "7pm" : ""}
      </div>
      <div className="text-md">{timeslot.artist.title}</div>
    </div>
  );
}

interface ListProps {
  timeslots: TimeslotDto[];
}

export function ListComponent({ timeslots }: ListProps) {
  return (
    <div className="flex flex-row space-y-4 gap-2 justify-center md:justify-between relative">
      <div className="flex-col w-1/2 hidden md:flex">
        <div>
          <Image
            src={"/OpenMicMpls_Logo.png"}
            height={2800}
            width={2800}
            alt="OpenMic MPLS Logo"
          />
        </div>
        <div className="text-xl text-center">Mondays 6pm-11</div>
      </div>
      <div className="flex flex-col md:w-1/2 overflow-x-scroll h-max w-2/3">
        {timeslots.map((timeslot) => {
          return <TimeslotComponent key={timeslot.id} timeslot={timeslot} />;
        })}
      </div>
    </div>
  );
}
