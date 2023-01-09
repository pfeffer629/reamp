import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { ITrack } from "@spinamp/spinamp-sdk";
import PlaylistContext from "../../contexts/PlaylistContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Playlist() {
  const [playlist, setPlaylist] = useState({});
  const router = useRouter();
  const { id } = router.query
  const timeAgo = new TimeAgo("en-US");
  const { userPlaylists } = useContext(PlaylistContext);
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({
    address: "0x4449b8e2B2068D71EA27735115aa11B4870cCA38",
  });
  const { data: ensName } = useEnsName({ address });
  useEffect(() => {
    if (id) {
      setPlaylist(userPlaylists.filter(playlist => playlist.id === id))
    }
  }, [userPlaylists, id]);

  if (Object.keys(playlist)) {
    return (<div></div>)
  }

  return (
    <div className="w-[895px] mx-auto">
      <div
        key={playlist?.id}
        className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
      >
        <div
          className="relative inline"
        >
          <img
            src={playlist?.cover}
            alt="playlist"
            className="w-[204px] h-[210px] rounded-[10px]"
          />
        </div>
        <div className="pt-2">
          <div className="text-whiteDisabled text-[11px]">
            {/*PLAYLIST • {playlist?.tracks.length} TRACKS*/}
          </div>
        </div>
        <div className="text-white text-[20px]">{playlist?.name}</div>
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
            {timeAgo.format(new Date(playlist?.created_at || 0))}
          </div>
        </div>
      </div>
      <div className="py-4 flex flex-col space-y-4 min-h-[calc(100vh-160px)]">
        <div className="w-full">
          <div className="flex items-center">
            <div className="w-[46px]"></div>
            <div className="p-[9px]">
              <div className="w-[52px]">Cover</div>
            </div>
            <div className="w-[191px]">Track</div>
            <div className="w-[130px] text-center">Released</div>
            <div className="w-[130px] text-center">Collectors</div>
            <div className="w-[70px] text-center">Value</div>
            <div className="w-[60px]"></div>
            <div className="w-[130px] text-center">Collect</div>
          </div>
          {playlist?.tracks &&
            playlist.tracks.map((track) => (
              <div className="flex flex-col space-y-4" key={track.id}>
                <div className="flex w-full item-center bg-black group hover:bg-blackSecondary transition-all rounded-lg">
                  <div className="w-[46px]">
                    <div className="flex items-center h-full justify-center">
                      <div className="cursor-pointer hover:bg-gray-800/80 flex justify-center items-center transition-all duration-300 transform rounded-full w-[38px] h-[38px]">
                        <img
                          loading="lazy"
                          alt="Play Button"
                          src="/icons/PlayButton.png"
                          className="w-[14px] translate-x-[1px]"
                          onClick={() => handleSelectTrack(track)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-[9px]">
                    <div className="w-[52px] aspect-square overflow-hidden h-full flex items-center">
                      <Image
                        alt={track.title}
                        height={52}
                        width={52}
                        src={track.lossyArtworkUrl || ""}
                        className="rounded-[5px]"
                      />
                    </div>
                  </div>
                  <Link
                    className="flex items-center w-[191px]"
                    href={`/track/${track.slug}`}
                  >
                    <div className="flex flex-col justify-center w-full pr-2">
                      <div className="truncate w-full">{track.title}</div>
                      <div className="text-whiteDisabled truncate w-full">
                        {track.artist.name}
                      </div>
                    </div>
                  </Link>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    {timeAgo.format(new Date(track.createdAtTime || 0))}
                  </div>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    0
                  </div>
                  <div className="w-[70px] flex items-center justify-center h-[70px]">
                    <div className="flex items-center space-x-1">
                      <div className="font-sans pb-[2px]">Ξ</div>
                      <div>0</div>
                    </div>
                  </div>
                  <div className="w-[60px] flex items-center justify-center h-[70px]">
                    <div className="cursor-pointer hover:scale-125 transition-all p-2 hover:bg-slate-800/40 rounded-md select-none">
                      {favorites.includes(track.id) ? (
                        <img
                          src="/icons/HeartFilled.png"
                          alt="Heart Filled"
                          className="w-[14px]"
                          onClick={() => removeFavorite(track.id)}
                        />
                      ) : (
                        <img
                          src="/icons/HeartEmpty.png"
                          alt="Heart Empty"
                          className="w-[14px]"
                          onClick={() => addFavorite(track.id)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 pt-[2px] select-none">
                      collect
                    </div>
                  </div>
                  <div className="w-[60px] flex items-center justify-center h-[70px]">
                    <div className="bg-transparent hover:bg-gray-500/30 p-2 transition-all transform rounded-lg cursor-pointer duration-300">
                      <img
                        src="/icons/ThreeDots.png"
                        alt="Three Dots"
                        className="w-[16px]"
                      />
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
