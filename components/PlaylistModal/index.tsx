import { useState, useContext } from "react";
import PlaylistContext from "../../contexts/PlaylistContext";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function PlaylistModal() {
  const [playlistName, setPlaylistName] = useState("");
  const { showModal, toggleModal, createPlaylist, userPlaylists } =
    useContext(PlaylistContext);
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({
    address: "0x4449b8e2B2068D71EA27735115aa11B4870cCA38",
  });
  const { data: ensName } = useEnsName({ address });
  const timeAgo = new TimeAgo("en-US");

  const handleClose = () => {
    toggleModal();
    setPlaylistName("");
  };

  return (
    <div
      className={showModal ? "relative z-10" : "hidden"}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/[0.6] transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="w-[830px] bg-black[/0.6] p-[30px] border-darkLine border-[1px] rounded-2xl">
            <div className="sm:flex sm:items-center justify-between">
              <div className="px-[12px] rounded-lg w-[380px] h-[41px] flex items-center bg-transparent relative outline-none border-darkLine border-[1px]">
                <input
                  type="text"
                  className="w-[380px] pt-[4px] flex items-center bg-transparent relative outline-none ring-0 text-[16px] text-searchbarText"
                  placeholder="Create New Playlist"
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
                className="cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="flex flex-start">
              {userPlaylists.length &&
                userPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="text-left px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
                  >
                    <img
                      src={playlist.cover}
                      alt="playlist"
                      className="w-[204px] h-[210px] rounded-[10px]"
                    />
                    <div className="pt-2">
                      <div className="text-whiteDisabled text-[11px]">
                        PLAYLIST • {playlist.tracks.length} TRACKS
                      </div>
                    </div>
                    <div className="text-white text-[18px]">
                      {playlist.title}
                    </div>
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
