import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";
import Tracklist from "../../components/Tracklist";

export default function Artists() {
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);

  if (isLoading || isError) {
    return <div></div>;
  }

  return (
    <Tracklist tracks={tracks} />
  );
}
