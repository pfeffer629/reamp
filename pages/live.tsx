import { useContext } from "react";
import PlaylistContext from "../contexts/PlaylistContext";
import TrackContext from "../contexts/TrackContext";
import PlayButton from "../components/Icons/PlayButton";
import TimeAgo from "javascript-time-ago";
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

  const timeAgo = new TimeAgo("en-US");

  const handleSelectPlaylist = (
    e: React.MouseEvent<SVGSVGElement>,
    playlistTracks: string[]
  ) => {
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
  };

  return (
    <div>
      <div className="flex flex-col space-y-4">
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
          <img className="mx-[44px]" src="/icons/Catalog.svg" />
          <img className="mr-[44px]" src="/icons/Sound.svg" />
          <img className="mr-[44px]" src="/icons/Zora.svg" />
          <img className="mr-[44px]" src="/icons/Nina.svg" />
        </div>
        <div className="flex flex-wrap space-x-3 pb-[10px] tracking-wide">
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">789</div>
            <div className="text-searchBarText">Artists</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">10,667</div>
            <div className="text-searchBarText">Collectors</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">50,282</div>
            <div className="text-searchBarText">Tracks</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">$12,625,304</div>
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
        <div className="flex flex-wrap">
          {recentPlaylists.length > 0 &&
            address &&
            recentPlaylists.map((playlist) => (
              <Link
                href={`/playlists/${playlist.id}`}
                as={`/playlists/${playlist.id}`}
                key={playlist.id}
              >
                <div
                  key={playlist.id}
                  className="px-[10px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[223px]"
                >
                  <div className="relative inline">
                    <img
                      src={playlist.cover}
                      alt="playlist"
                      className="w-[204px] h-[210px] rounded-[10px]"
                    />
                    {address && (
                      <PlayButton
                        className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                        height={25}
                        width={20}
                        onClick={(e) =>
                          handleSelectPlaylist(e, playlist.tracks)
                        }
                      />
                    )}
                  </div>
                  <div className="pt-3 pb-.5">
                    <div className="text-whiteDisabled text-[11px]">
                      PLAYLIST • {playlist.tracks.length} TRACKS
                    </div>
                  </div>
                  <div className="text-white text-[18px] pb-1">
                    {playlist.name}
                  </div>
                  <div className="flex flex-row items-center space-x-[9px] truncate">
                    <img
                      src="https://reamp-javitoshi-o6khee0h5-javitoshi.vercel.app/users/user1.png"
                      alt="user"
                      className="w-[21px] aspect-square"
                    />
                    &nbsp;{playlist.user_id}
                  </div>
                  <div className="pt-2">
                    <div className="text-whiteDisabled text-[14px]">
                      {timeAgo.format(new Date(playlist.created_at || 0))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {recentPlaylists.length > 0 &&
            !address &&
            recentPlaylists.map((playlist) => (
              <div>
                <div
                  key={playlist.id}
                  className="px-[10px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[223px]"
                >
                  <div className="relative inline">
                    <img
                      src={playlist.cover}
                      alt="playlist"
                      className="w-[204px] h-[210px] rounded-[10px]"
                    />
                    {address && (
                      <PlayButton
                        className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                        height={25}
                        width={20}
                        onClick={(e) =>
                          handleSelectPlaylist(e, playlist.tracks)
                        }
                      />
                    )}
                  </div>
                  <div className="pt-3 pb-.5">
                    <div className="text-whiteDisabled text-[11px]">
                      PLAYLIST • {playlist.tracks.length} TRACKS
                    </div>
                  </div>
                  <div className="text-white text-[18px] pb-1">
                    {playlist.name}
                  </div>
                  <div className="flex flex-row items-center space-x-[9px] truncate">
                    <img
                      src="https://reamp-javitoshi-o6khee0h5-javitoshi.vercel.app/users/user1.png"
                      alt="user"
                      className="w-[21px] aspect-square"
                    />
                    &nbsp;{playlist.user_id}
                  </div>
                  <div className="pt-2">
                    <div className="text-whiteDisabled text-[14px]">
                      {timeAgo.format(new Date(playlist.created_at || 0))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
