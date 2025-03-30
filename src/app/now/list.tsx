"use client";
import { EventDto, TimeslotDto, TimesMarkerDto } from "@/client";
import { getEventOptions } from "@/client/@tanstack/react-query.gen";
import Image from "next/image";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";

interface TimeslotProps {
  idx: number;
  markers: TimesMarkerDto[];
  timeslot: TimeslotDto;
}

export function TimeslotComponent({ idx, timeslot, markers }: TimeslotProps) {
  const currentMarker = markers.find(
    (m) => m.slot_index === idx && m.type === "TIME"
  );

  const nowPlaying = !!markers.find(
    (m) => m.slot_index === idx && m.type === "PLAYING"
  );
  return (
    <div className="flex">
      <div className="w-10 h-4 mr-4 text-sm">{currentMarker?.display}</div>
      <div
        className={clsx(
          "text-sm flex justify-between w-full",
          nowPlaying ? " border-b-2 border-emerald-400" : ""
        )}
      >
        <div>
          <span>{timeslot.artist.title} </span>
          <span> ({timeslot.song_count})</span>
        </div>
        <div>
          <span className="text-emerald-700 font-bold">
            {nowPlaying ? "Playing" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

interface ListProps {
  event: EventDto;
}

export function ListComponent({ event }: ListProps) {
  const { data, error } = useQuery({
    ...getEventOptions({
      path: {
        id: event.id,
      },
    }),
    initialData: event,
    refetchInterval: 1000,
  });
  return (
    <div className="flex flex-row space-y-4 gap-2 justify-center md:justify-between relative">
      <div className="flex-col w-1/2 md:flex">
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
      <div className="flex flex-col md:w-1/2 w-2/3">
        {(data.time_slots ?? []).map((timeslot, idx) => {
          return (
            <TimeslotComponent
              key={timeslot.id}
              idx={idx}
              markers={data.time_markers ?? []}
              timeslot={timeslot}
            />
          );
        })}
      </div>
    </div>
  );
}
