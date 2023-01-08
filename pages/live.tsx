import { useContext } from "react";
import PlaylistContext from "../contexts/PlaylistContext";
import TrackContext from "../contexts/TrackContext";
import PlayButton from "../components/Icons/PlayButton";
import TimeAgo from "javascript-time-ago";
import { fetchTracksByIds } from "@spinamp/spinamp-sdk";
import shuffleArray from "../utils/shuffleArray";

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
  const timeAgo = new TimeAgo("en-US");

  const handleSelectPlaylist = (playlistTracks: string[]) => {
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
        <div className="flex items-center space-x-2">
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
        </div>
        <div className="flex flex-wrap space-x-3">
            <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">771</div>
            <div className="text-searchBarText">Artists</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">10,513</div>
            <div className="text-searchBarText">Collectors</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">48,695</div>
            <div className="text-searchBarText">Tracks</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">$12,539,724</div>
            <div className="text-searchBarText">Total Volume (USD)</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 py-1 mt-6">
          <div>Recent Playlists</div>
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
        </div>
        <div className="py-4 flex flex-wrap space-x-2">
          {recentPlaylists.length > 0 &&
            recentPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
              >
                <div
                  className="relative inline"
                  onClick={() => handleSelectPlaylist(playlist.tracks)}
                >
                  <img
                    src={playlist.cover}
                    alt="playlist"
                    className="w-[204px] h-[210px] rounded-[10px]"
                  />
                  <PlayButton
                    className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                    height={25}
                    width={20}
                  />
                </div>
                <div className="pt-2">
                  <div className="text-whiteDisabled text-[11px]">
                    PLAYLIST • {playlist.tracks.length} TRACKS
                  </div>
                </div>
                <div className="text-white text-[20px]">{playlist.name}</div>
                <div className="flex flex-row items-center space-x-[9px]">
                  <img
                    src="https://reamp-javitoshi-o6khee0h5-javitoshi.vercel.app/users/user1.png"
                    alt="user"
                    className="w-[21px] aspect-square"
                  />
                  &nbsp;Placeholder name
                </div>
                <div className="pt-2">
                  <div className="text-whiteDisabled text-[15px]">
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
