import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchTracksByIds } from "@spinamp/spinamp-sdk";
import PlaylistContext from "../contexts/PlaylistContext";
import TrackContext from "../contexts/TrackContext";
import InfoCard from "../components/InfoCard";
import CardLayout from "../components/CardLayout";
import shuffleArray from "../utils/shuffleArray";
import { useAccount } from "wagmi";
import Onboarding from "../components/Onboarding";

export default function Playlists() {
  const { userPlaylists } = useContext(PlaylistContext);
  const {
    setCurrentTrack,
    setCurrentTrackIndex,
    setIsPlaying,
    setTracklist,
    setShuffledTracklist,
    shuffle,
  } = useContext(TrackContext);
  const { address } = useAccount();

  const router = useRouter();

  const playListIcon = <img
    alt="Playlist"
    src="/icons/Playlist.svg"
    className="w-[37px]"
  />

  const handleSelectPlaylist = (
    playlist: any,
    mobile = false
  ) => {
    fetchTracksByIds(playlist.tracks).then((tracks) => {
      if (shuffle) {
        setTracklist(tracks);
        const shuffledTracks = shuffleArray([...tracks]);
        setShuffledTracklist(shuffledTracks);
        setCurrentTrack(shuffledTracks[0]);
        setCurrentTrackIndex(0);
      } else {
        setTracklist(tracks);
        setCurrentTrack(tracks[0]);
        setCurrentTrackIndex(0);
      }
      setIsPlaying(true);
    });

    if (mobile) {
      router.push("/playing");
    }
  };

  return (
    userPlaylists.length ? 
    <CardLayout>
      {userPlaylists.length > 0 &&
        userPlaylists.map((playlist) => (
          <Link
            href={`/playlists/${playlist.id}`}
            as={`/playlists/${playlist.id}`}
            key={playlist.id}
          >
            <InfoCard
              address={address}
              playlist={playlist}
              onClick={() => handleSelectPlaylist(playlist)}
              mobileOnClick={() =>
                handleSelectPlaylist(playlist, true)
              }
            />
          </Link>
        ))}
    </CardLayout>
    :
    <Onboarding icon={playListIcon} text={"Looks like you haven’t created any playlists yet"} cta={"Create your first playlist"} ctaLink={"/live"}/>
  );
}
