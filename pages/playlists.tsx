import Link from "next/link";
import { useContext } from "react";
import { fetchTracksByIds } from "@spinamp/spinamp-sdk";
import PlaylistContext from "../contexts/PlaylistContext";
import TrackContext from "../contexts/TrackContext";
import PlayButton from "../components/Icons/PlayButton";
import shuffleArray from "../utils/shuffleArray";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

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
  const { data: ensAvatar } = useEnsAvatar({
    address: "0x4449b8e2B2068D71EA27735115aa11B4870cCA38",
  });
  const { data: ensName } = useEnsName({ address });
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
    <div className="flex flex-col space-y-4">
      <div className="py-4 flex flex-wrap">
        {userPlaylists.length > 0 &&
          userPlaylists.map((playlist) => (
            <Link
              href={`/playlists/${playlist.id}`}
              as={`/playlists/${playlist.id}`}
            >
              <div
                key={playlist.id}
                className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
              >
                <div className="relative inline">
                  <img
                    src={playlist.cover}
                    alt="playlist"
                    className="w-[204px] h-[210px] rounded-[10px]"
                  />
                  <PlayButton
                    className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                    height={25}
                    width={20}
                    onClick={(e) => handleSelectPlaylist(e, playlist.tracks)}
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
                    src={ensAvatar || ""}
                    alt="user"
                    className="w-[21px] aspect-square rounded-[10px]"
                  />
                  &nbsp;{ensName}
                </div>
                <div className="pt-2">
                  <div className="text-white text-[15px]">
                    {timeAgo.format(new Date(playlist.created_at || 0))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
