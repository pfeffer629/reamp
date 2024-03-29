import { useState, useContext, useRef } from "react";
import PlaylistContext from "../../contexts/PlaylistContext";
import TrackContext from "../../contexts/TrackContext";
import useDragScroll from "../../utils/useDragScroll";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Image from "next/image";
import svgAvatar from "../../utils/svgAvatar";
TimeAgo.addDefaultLocale(en);

export default function PlaylistModal() {
  const [playlistName, setPlaylistName] = useState("");
  const {
    showModal,
    toggleModal,
    createPlaylist,
    userPlaylists,
    addToPlaylist,
  } = useContext(PlaylistContext);

  let { address } = useAccount();

  if (!address) {
    address = "0x12345";
  }

  const { data: ensAvatar } = useEnsAvatar({
    address: address,
  });

  const { currentTrack } = useContext(TrackContext);
  const { data: ensName } = useEnsName({ address });
  const ref = useRef(null);
  useDragScroll({
    sliderRef: ref,
  });

  if (!address) {
    return <div ref={ref}></div>;
  }

  const timeAgo = new TimeAgo("en-US");

  const handleClose = () => {
    toggleModal();
    setPlaylistName("");
  };

  return (
    <div
      className={showModal ? "relative z-10 mb-[80px]" : "hidden"}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0">
        <div className="flex min-h-full items-end justify-center max-sm:p-0 p-4 text-center sm:items-center sm:p-0">
          <div
            className="fixed inset-0 bg-black/[0.6] transition-opacity z-5"
            onClick={handleClose}
          ></div>
          <div className="z-10 max-sm:w-full w-[830px] max-sm:h-[100vh] overflow-scroll bg-black/[0.6] p-[30px] border-darkLine border-[1px] rounded-2xl">
            <div className="max-sm:mb-[12px] flex items-center justify-between">
              <div className="px-[12px] rounded-lg max-sm:w-full w-[380px] h-[41px] flex items-center bg-transparent relative outline-none border-darkLine border-[1px]">
                <input
                  type="text"
                  className="max-sm:w-full w-[380px] pt-[4px] flex items-center bg-transparent relative outline-none ring-0 text-[16px] text-searchbarText"
                  placeholder="Create New Playlist"
                  maxLength={24}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
                <img
                  alt="Add"
                  src="/icons/Add.svg"
                  className="cursor-pointer"
                  onClick={() => createPlaylist(playlistName)}
                />
              </div>
              <img
                alt="Close"
                src="/icons/Close.svg"
                className="cursor-pointer max-sm:ml-[10px]"
                onClick={handleClose}
              />
            </div>
            <div
              className="flex flex-start overflow-auto scrollbar-hide cursor-pointer max-sm:grid max-sm:grid-flow-dense max-sm:grid-cols-2 justify-items-center gap-y-0"
              ref={ref}
            >
              {userPlaylists.length > 0 ? (
                userPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="shrink-0 text-left px-[8px] py-[10px] transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[223px] max-sm:w-auto max-w-full"
                  >
                    <div className="relative inline">
                      <Image
                        src={playlist.cover}
                        alt="playlist"
                        className="rounded-[10px]"
                        width={204}
                        height={204}
                      />
                    </div>
                    <div className="pt-2">
                      <div className="text-whiteDisabled text-[11px]">
                        PLAYLIST • {playlist.tracks.length} TRACKS
                      </div>
                    </div>
                    <div className="text-white text-[20px] flex">
                      {playlist.name}
                      <img
                        alt="Add"
                        src="/icons/Add.svg"
                        className="cursor-pointer ml-3"
                        onClick={() => addToPlaylist(playlist.id)}
                      />
                    </div>
                    <div className="flex flex-row items-center space-x-[9px]">
                      <img
                        src={ensAvatar || svgAvatar}
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
                ))
              ) : (
                <div className="text-left px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]">
                  <Image
                    src={currentTrack?.lossyArtworkUrl || ""}
                    alt="playlist"
                    className="w-[204px] h-[204px] rounded-[10px]"
                    width={204}
                    height={204}
                  />
                  <div className="pt-2">
                    <div className="text-whiteDisabled text-[11px]">
                      PLAYLIST • 0 TRACKS
                    </div>
                  </div>
                  <div className="text-white text-[20px] flex">
                    My first playlist
                    <img
                      alt="Add"
                      src="/icons/Add.svg"
                      className="cursor-pointer ml-3"
                      onClick={() => createPlaylist("My first Playlist")}
                    />
                  </div>
                  <div className="flex flex-row items-center space-x-[9px]">
                    <img
                      src={ensAvatar || svgAvatar}
                      alt="user"
                      className="w-[21px] aspect-square rounded-[10px]"
                    />
                    &nbsp;{ensName}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
