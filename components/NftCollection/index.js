import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useCollectionQuery } from "@spinamp/spinamp-hooks";
import TrackContext from "../../contexts/TrackContext";
import InfoCard from "../../components/InfoCard";

export default function NftCollection({ address }) {
  const { setCurrentTrack, setCurrentTrackIndex, setIsPlaying, setTracklist, tracklist } =
    useContext(TrackContext);
  const router = useRouter();

  const { data, error, isLoading } = useCollectionQuery(address);

  if (isLoading || error) {
    return <div></div>;
  }

  const handleSelectTrack = (index, track, mobile = false) => {
    setCurrentTrack(track);
    if (data !== tracklist) {
      setTracklist(data);
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);

    if (mobile) {
      router.push("/playing");
    }
  };

  return (
    <>
      {data.length > 0 &&
        data.map((track, index) => (
          <InfoCard
            address={address}
            track={track}
            onClick={() => handleSelectTrack(index, track)}
            mobileOnClick={() => handleSelectTrack(track, true)}
            collection={true}
          />
        ))}
    </>
  );
}
