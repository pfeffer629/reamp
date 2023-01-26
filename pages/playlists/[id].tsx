import { useContext } from "react";
import PlaylistContext from "../../contexts/PlaylistContext";
import Tracklist from "../../components/Tracklist";
import ethAccounts from "../../utils/ethAccounts";

export default function Playlist() {
  const { selectedPlaylist } = useContext(PlaylistContext);
console.log(selectedPlaylist.user_id)
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
          <div>
            <span className="text-white text-[30px]">
              {selectedPlaylist?.name}
            </span>
          </div>
          <div className="flex flex-row items-center space-x-[9px]">
            <img
              src={ethAccounts[selectedPlaylist.user_id] && ethAccounts[selectedPlaylist.user_id]["avatar"]}
              alt="user"
              className="w-[21px] rounded-xl"
            />
            &nbsp;{ethAccounts[selectedPlaylist.user_id] && ethAccounts[selectedPlaylist.user_id]["ens"]}
          </div>
        </div>
      </div>
      <div className="mt-4 w-full h-[2px] bg-whiteDisabled z-0"></div>
      <Tracklist tracks={selectedPlaylist.tracks} />
    </div>
  );
}
