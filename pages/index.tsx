import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";
import Tracklist from "../components/Tracklist";
import {initialize} from '@spinamp/spinamp-sdk';

initialize({
    IPFS_GATEWAY_URL_IMAGE: 'https://media.spinamp.xyz/v1',
});


export default function Home() {
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);

  if (isLoading || isError) {
    return <div></div>;
  }

  return <Tracklist tracks={tracks} />;
}
