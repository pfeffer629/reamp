import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";
import Tracklist from "../../components/Tracklist";
import { useRouter } from "next/router";
import { useArtistQuery } from "@spinamp/spinamp-hooks";

export default function Artists() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useArtistQuery(id.join("/"));

  if (isLoading || isError) {
    return <div></div>;
  }

  return <Tracklist tracks={data.tracks} />;
}
