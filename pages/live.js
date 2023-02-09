import { useContext } from "react";
import PlaylistContext from "../contexts/PlaylistContext";
import TrackContext from "../contexts/TrackContext";
import PlayButton from "../components/Icons/PlayButton";
import TimeAgo from "javascript-time-ago";
import { fetchTracksByIds } from "@spinamp/spinamp-sdk";
import shuffleArray from "../utils/shuffleArray";
import ethAccounts from "../utils/ethAccounts";
import Link from "next/link";
import { useAccount } from "wagmi";
import Image from "next/image";

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

  const handleSelectPlaylist = (e, playlistTracks) => {
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
      <div className="max-sm:flex min-h-[calc(100vh-300px)] flex-col items-center justify-center hidden">
        <img alt="Globe" src="/icons/Globe.svg" className="h-[21px] w-[21px]" />
        <div className="text-whiteDisabled text-center text-[20px] my-[21px]">
          Visit Reamp.xyz on desktop <br />
          to see your collection
        </div>
        <a
          className="rounded-md bg-transparent hover:bg-sidebarMenuHoverBg cursor-pointer flex items-center text-[12px] relative group transition-all duration-500"
          href="https://form.typeform.com/to/i5cEbCte"
          target="_blank"
        >
          <div className="cursor-pointer bg-white group-hover:bg-selectedTab text-[14px] px-[24px] py-[8px] flex justify-center items-center text-[10px] rounded-lg text-black transition-all duration-500 mt-[6px] select-none">
            Request Access
          </div>
        </a>
      </div>
      <div className="max-sm:hidden flex flex-col space-y-4">
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
          <img className="mx-[34px] ml-5" src="/icons/logos/Catalog.svg" />
          <img className="mr-[34px]" src="/icons/logos/Sound.svg" />
          <img className="mr-[34px]" src="/icons/logos/Zora.svg" />
          <img className="mr-[34px]" src="/icons/logos/Nina.svg" />
        </div>
        <div className="flex flex-wrap space-x-3 pb-[10px] tracking-wide">
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">1,684</div>
            <div className="text-searchBarText">Artists</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">12,936</div>
            <div className="text-searchBarText">Collectors</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">61,433</div>
            <div className="text-searchBarText">Total Tracks</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-sidebarBg inline-flex border border-darkLine hover:border-whiteDisabled">
            <div className="">$12,820,837</div>
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
                    <Image
                      src={playlist.cover}
                      alt="playlist"
                      className="rounded-[10px]"
                      height={210}
                      width={204}
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
                  <div className="pt-2">
                    <div className="text-whiteDisabled text-xs font-normal">
                      Playlist • {playlist.tracks.length}{" "}
                      {playlist.tracks.length === 1 ? "Track" : "Tracks"}
                    </div>
                  </div>
                  <div className="text-white text-[20px] text-base">
                    {playlist.name}
                  </div>
                  <div className="flex flex-row items-center pt-1 text-sm space-x-[9px]">
                    <Image
                      src={ethAccounts[playlist.user_id]["avatar"]}
                      alt="user"
                      className="rounded-xl"
                      height={21}
                      width={21}
                    />
                    &nbsp;{ethAccounts[playlist.user_id]["ens"]}
                  </div>
                  <div className="pt-2">
                    <div className="text-whiteDisabled text-[15px] text-xs">
                      {timeAgo.format(new Date(playlist.created_at || 0))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {recentPlaylists.length > 0 &&
            !address &&
            recentPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="px-[10px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[223px]"
              >
                <div className="relative inline">
                  <Image
                    src={playlist.cover}
                    alt="playlist"
                    className="rounded-[10px]"
                    height={210}
                    width={204}
                  />
                  {address && (
                    <PlayButton
                      className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                      height={25}
                      width={20}
                      onClick={(e) => handleSelectPlaylist(e, playlist.tracks)}
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
                  <Image
                    src={ethAccounts[playlist.user_id]["avatar"]}
                    alt="user"
                    className="rounded-xl"
                    height={21}
                    width={21}
                  />
                  &nbsp;{ethAccounts[playlist.user_id]["ens"]}
                </div>
                <div className="pt-2">
                  <div className="text-whiteDisabled text-[14px]">
                    {timeAgo.format(new Date(playlist.created_at || 0))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
