import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useCollectionQuery } from "@spinamp/spinamp-hooks";
import TrackContext from "../../contexts/TrackContext";
import InfoCard from "../../components/InfoCard";

export default function NftCollection({ address }) {
  const { setCurrentTrack, setCurrentTrackIndex, setIsPlaying, setTracklist } =
    useContext(TrackContext);
  const router = useRouter();

  const { data, error, isLoading } = useCollectionQuery(address);

  if (isLoading || error) {
    return <div></div>;
  }

  const handleSelectTrack = (track, mobile = false) => {
    setCurrentTrack(track);
    setTracklist([track]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);

    if (mobile) {
      router.push("/playing");
    }
  };

  return (
    <>
      {data.length > 0 &&
        data.map((track) => (
          <InfoCard
            address={address}
            track={track}
            onClick={() => handleSelectTrack(track)}
            mobileOnClick={() => handleSelectTrack(track, true)}
            collection={true}
          />
        ))}
    </>
  );
}
