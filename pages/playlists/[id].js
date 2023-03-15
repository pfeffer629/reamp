import { useContext } from "react";
import PlaylistContext from "../../contexts/PlaylistContext";
import Tracklist from "../../components/Tracklist";
import Image from "next/image";

export default function Playlist() {
  const { selectedPlaylist } = useContext(PlaylistContext);

  return (
    <div className="max-sm:px-[24px] max-sm:w-full w-[895px] mx-auto">
      <div className="flex">
        <div key={selectedPlaylist?.id} className="inline-block mr-[32px]">
          <div className="relative inline">
            <Image
              src={selectedPlaylist?.cover}
              alt="playlist"
              className="rounded-[10px]"
              height={204}
              width={204}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="pt-2">
            <div className="text-whiteDisabled text-[11px]">
              PUBLIC PLAYLIST • {selectedPlaylist?.tracks?.length} TRACKS
            </div>
          </div>
          <div>
            <span className="text-white text-[30px]">
              {selectedPlaylist?.name}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-[9px]">
            <Image
              src={selectedPlaylist.users.avatar}
              alt="user"
              className="rounded-xl"
              height={21}
              width={21}
            />
            &nbsp;
            {selectedPlaylist.users.ens}
          </div>
        </div>
      </div>
      <div className="mt-4 w-full h-[2px] bg-whiteDisabled z-0"></div>
      <Tracklist tracks={selectedPlaylist.tracks} />
    </div>
  );
}
