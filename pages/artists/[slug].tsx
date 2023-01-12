import Tracklist from "../../components/Tracklist";
import { useRouter } from "next/router";
import { useArtistQuery } from "@spinamp/spinamp-hooks";

export default function Artists() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, isError } = useArtistQuery(slug ? slug.toString() : "");

  if (isLoading || isError) {
    return <div></div>;
  }

  return <Tracklist tracks={data.tracks} />;
}
