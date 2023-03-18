import { useContext } from "react";
import { useRouter } from "next/navigation";
import PlaylistContext from "../contexts/PlaylistContext";
import TrackContext from "../contexts/TrackContext";
import InfoCard from "../components/InfoCard";
import CardLayout from "../components/CardLayout";
import { fetchTracksByIds } from "@spinamp/spinamp-sdk";
import shuffleArray from "../utils/shuffleArray";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Live() {
  const { recentPlaylists } = useContext(PlaylistContext);
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

  const handleSelectPlaylist = (e, playlistTracks, mobile = false) => {
    e.preventDefault();
    e.stopPropagation();
    fetchTracksByIds(playlistTracks).then((tracks) => {
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
    <div>
      <div className="flex flex-col space-y-4 max-sm:px-[3px]">
        <div className="flex items-center">
          <div>Ecosystem Highlights</div>
          <div className="p-2 mb-1 text-sm cursor-pointer transition-all hover:bg-gray-700/40 bg-transparent rounded-md">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm64 226H200v-32h44v-88h-32v-32h64v120h44z"></path>
            </svg>
          </div>
          <span className="max-sm:hidden flex">
            <img className="mx-[34px] ml-5" src="/icons/logos/Catalog.svg" />
            <img className="mr-[34px]" src="/icons/logos/Sound.svg" />
            <img className="mr-[34px]" src="/icons/logos/Zora.svg" />
            <img className="mr-[34px]" src="/icons/logos/Nina.svg" />
          </span>
        </div>
        <div className="flex flex-wrap max-sm:flex-nowrap max-sm:overflow-x-scroll space-x-3 pb-[10px] tracking-wide whitespace-nowrap">
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">1,671</div>
            <div className="text-searchBarText">Artists</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">15,218</div>
            <div className="text-searchBarText">Collectors</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">79,775</div>
            <div className="text-searchBarText">Total Tracks</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">$13,306,464</div>
            <div className="text-searchBarText">Total Volume (USD)</div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div>Recent Playlists</div>
          <div className="p-2 text-sm cursor-pointer transition-all hover:bg-gray-700/40 bg-transparent rounded-md">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm64 226H200v-32h44v-88h-32v-32h64v120h44z"></path>
            </svg>
          </div>
        </div>
        <CardLayout>
          {recentPlaylists.length > 0 &&
            address &&
            recentPlaylists.map((playlist) => (
              <Link
                href={`/playlists/${playlist.id}`}
                as={`/playlists/${playlist.id}`}
                key={playlist.id}
              >
                <InfoCard
                  address={address}
                  playlist={playlist}
                  onClick={(e) => handleSelectPlaylist(e, playlist.tracks)}
                  mobileOnClick={(e) =>
                    handleSelectPlaylist(e, playlist.tracks, true)
                  }
                />
              </Link>
            ))}
          {recentPlaylists.length > 0 &&
            !address &&
            recentPlaylists.map((playlist) => (
              <InfoCard
                address={address}
                playlist={playlist}
                onClick={(e) => handleSelectPlaylist(e, playlist.tracks)}
                mobileOnClick={(e) =>
                  handleSelectPlaylist(e, playlist.tracks, true)
                }
              />
            ))}
        </CardLayout>
      </div>
    </div>
  );
}
