import { useContext } from "react";
import Image from "next/image";
import PlaylistContext from "../../contexts/PlaylistContext";
import TrackContext from "../../contexts/TrackContext";
import FavoritesContext from "../../contexts/FavoritesContext";
import Tracklist from "../../components/Tracklist";
import Link from "next/link";
import { ITrack } from "@spinamp/spinamp-sdk";
import { useAccount } from "wagmi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Playlist() {
  const timeAgo = new TimeAgo("en-US");
  const { selectedPlaylist } = useContext(PlaylistContext);
  const {
    currentTrack,
    setCurrentTrack,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    setTracklist,
  } = useContext(TrackContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const { address } = useAccount();

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(selectedPlaylist.tracks.indexOf(track));
    setTracklist(selectedPlaylist.tracks);
    setIsPlaying(true);
  };
  console.log(selectedPlaylist);

  return (
    <div className="w-[895px] mx-auto">
      <div className="flex">
        <div key={selectedPlaylist?.id} className="inline-block mr-[32px]">
          <div className="relative inline">
            <img
              src={selectedPlaylist?.cover}
              alt="playlist"
              className="w-[204px] h-[210px] rounded-[10px]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="pt-2">
            <div className="text-whiteDisabled text-[11px]">
              PUBLIC PLAYLIST • {selectedPlaylist?.tracks?.length} TRACKS
            </div>
          </div>
          <div className="text-white text-[30px]">{selectedPlaylist?.name}</div>
          <div className="flex flex-row items-center space-x-[9px]">
            <img
              src="https://reamp-javitoshi-o6khee0h5-javitoshi.vercel.app/users/user1.png"
              alt="user"
              className="w-[21px] aspect-square"
            />
            &nbsp;Placeholder name
          </div>
        </div>
      </div>
      <div className="mt-4 w-full h-[2px] bg-whiteDisabled z-0"></div>
      <Tracklist tracks={selectedPlaylist.tracks} />
    </div>
  );
}
