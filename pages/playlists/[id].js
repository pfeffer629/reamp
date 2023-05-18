import { useContext, useState } from "react";
import PlaylistContext from "../../contexts/PlaylistContext";
import Tracklist from "../../components/Tracklist";
import ethAccounts from "../../utils/ethAccounts";
import Image from "next/image";
import EditPlaylistModal from "../../components/EditPlaylistModal";

export default function Playlist() {
  const { selectedPlaylist } = useContext(PlaylistContext);
  const [showEditPlaylistModal, setShowEditPlaylistModal] = useState(false);

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
              PUBLIC PLAYLIST • {selectedPlaylist?.tracks?.length}{" "}
              {selectedPlaylist?.tracks?.length === 1 ? "TRACK" : "TRACKS"}
            </div>
          </div>
          <div className="flex flex-row">
            <span className="flex items-center text-white text-[30px]">
              {selectedPlaylist?.name}
            </span>
            <div className="max-sm:w-auto max-sm:pr-[24px] w-[60px] flex items-center justify-center h-[70px]">
              <div className="bg-transparent p-2 hover:scale-125 transition-all cursor-pointer duration-300"
              onClick={()=>setShowEditPlaylistModal(true)}>
                  <img
                    src="/icons/SmallThreeDots.svg"
                    alt="Three Dots"
                    className="w-[16px]"
                  />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center space-x-[9px]">
            <Image
              src={
                ethAccounts[selectedPlaylist.user_id] &&
                ethAccounts[selectedPlaylist.user_id]["avatar"]
              }
              alt="user"
              className="rounded-xl"
              height={21}
              width={21}
            />
            &nbsp;
            {ethAccounts[selectedPlaylist.user_id] &&
              ethAccounts[selectedPlaylist.user_id]["ens"]}
          </div>
        </div>
      </div>
      <div className="mt-4 w-full h-[2px] bg-whiteDisabled z-0"></div>
      <Tracklist tracks={selectedPlaylist.tracks} />
      <EditPlaylistModal
        title={selectedPlaylist?.name}
        cover={selectedPlaylist?.cover}
        show={showEditPlaylistModal}
        close={() => setShowEditPlaylistModal(false)}
      />
    </div>
  );
}
