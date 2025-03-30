import { getArtist } from "@/client";
import { EditArtistForm } from "./edit-artist-form";

interface ArtistPageProps {
  params: Promise<{
    id: string; // This is the artistId
  }>;
}

export default async function AdminArtistPage({ params }: ArtistPageProps) {
  const artistId = (await params).id;
  const { data, error } = await getArtist({ path: { id: artistId } });
  if (error) {
    return <div>Error loading events</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-2xl font-semibold">{data.title}</div>
      <EditArtistForm artist={data} />
    </div>
  );
}
