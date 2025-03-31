import { ArtistDto, getAllArtists } from "@/client";
import Link from "next/link";
import { AddArtistDialog } from "./components/add-dialog";

export const dynamic = "force-dynamic";

function ArtistComponent({ artist }: { artist: ArtistDto }) {
  return (
    <Link
      href={`/admin/artists/${artist.id}`}
      className="p-4 rounded-xl border border-slate-600 aspect-3/1 flex"
    >
      <div>
        <div className="text-xl">{artist.title}</div>
        <div className="text-md">{artist.sub_title}</div>
      </div>
    </Link>
  );
}

export default async function AdminArtistsPage() {
  const { data, error } = await getAllArtists();
  if (error) {
    return <div>Error loading events</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between pb-12">
        <div className="text-4xl font-bold">Artists</div>
        <AddArtistDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((artist) => (
          <ArtistComponent key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
}
