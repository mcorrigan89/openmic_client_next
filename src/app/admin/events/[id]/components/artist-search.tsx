"use client";

import { ArtistDto } from "@/client";
import { Button } from "@/components/button";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogBackdrop,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { addArtistToList } from "./action";

interface ArtistSearchProps {
  eventId: string;
  artists: ArtistDto[];
}

export default function Example({ artists, eventId }: ArtistSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredArtists =
    query === ""
      ? []
      : artists.filter((artist) => {
          return artist.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Artist to List</Button>
      <Dialog
        className="relative z-10"
        open={open}
        onClose={() => {
          setOpen(false);
          setQuery("");
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/25 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <DialogPanel
            transition
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white ring-1 shadow-2xl ring-black/5 transition-all data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          >
            <Combobox
              onChange={async (artist: ArtistDto) => {
                if (artist) {
                  // window.location = person.url;
                  console.log(artist);
                  await addArtistToList(artist, eventId);
                  setQuery("");
                }
              }}
            >
              <div className="grid grid-cols-1">
                <ComboboxInput
                  autoFocus
                  className="col-start-1 row-start-1 h-12 w-full pr-4 pl-11 text-base text-gray-900 outline-hidden placeholder:text-gray-400 sm:text-sm"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={() => setQuery("")}
                />
                <MagnifyingGlassIcon
                  className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-400"
                  aria-hidden="true"
                />
              </div>

              {filteredArtists.length > 0 && (
                <ComboboxOptions
                  static
                  className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                >
                  {filteredArtists.map((artist) => (
                    <ComboboxOption
                      key={artist.id}
                      value={artist}
                      className="cursor-default px-4 py-2 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                      {artist.title}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}

              {query !== "" && filteredArtists.length === 0 && (
                <p className="p-4 text-sm text-gray-500">No people found.</p>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
