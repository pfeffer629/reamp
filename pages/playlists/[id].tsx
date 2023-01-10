import { useContext } from "react";
import Image from "next/image";
import PlaylistContext from "../../contexts/PlaylistContext";
import TrackContext from "../../contexts/TrackContext";
import Link from "next/link";
import { ITrack } from "@spinamp/spinamp-sdk";
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

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(selectedPlaylist.tracks.indexOf(track));
    setTracklist(selectedPlaylist.tracks);
    setIsPlaying(true);
  };

  return (
    <div className="w-[895px] mx-auto">
      <div
        key={selectedPlaylist?.id}
        className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
      >
        <div className="relative inline">
          <img
            src={selectedPlaylist?.cover}
            alt="playlist"
            className="w-[204px] h-[210px] rounded-[10px]"
          />
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
          {selectedPlaylist.tracks &&
            selectedPlaylist.tracks.map((track: ITrack) => (
              <div className="flex flex-col space-y-4" key={track.id}>
                <div className="flex w-full item-center bg-black group hover:bg-blackSecondary transition-all rounded-lg">
                  <div className="w-[46px]">
                    <div className="flex items-center h-full justify-center">
                      {currentTrack.id === track.id && isPlaying ? (
                        <div className="flex justify-center items-center w-[38px] h-[38px]">
                          <svg
                            fill="#fff"
                            id="loading-bar"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="22"
                            viewBox="0 0 16 22"
                          >
                            <g>
                              <rect
                                className="loading-bar"
                                width="4"
                                height="20"
                                rx="5"
                              />
                              <rect
                                className="loading-bar-middle"
                                width="4"
                                height="20"
                                rx="5"
                                x="6"
                              />
                              <rect
                                className="loading-bar"
                                width="4"
                                height="20"
                                rx="5"
                                x="12"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        <div className="cursor-pointer hover:bg-gray-800/80 flex justify-center items-center transition-all duration-300 transform rounded-full w-[38px] h-[38px]">
                          <img
                            loading="lazy"
                            alt="Play Button"
                            src="/icons/PlayButton.png"
                            className="w-[14px] translate-x-[1px]"
                            onClick={() => handleSelectTrack(track)}
                          />
                        </div>
                      )}
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
                    <div className="cursor-pointer hover:scale-125 transition-all p-2 hover:bg-slate-800/40 rounded-md select-none"></div>
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
