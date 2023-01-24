import { useContext } from "react";
import Image from "next/image";
import { ITrack } from "@spinamp/spinamp-sdk";
import TrackContext from "../../contexts/TrackContext";
import Link from "next/link";
import { useAccount } from "wagmi";
import FavoritesContext from "../../contexts/FavoritesContext";
import shuffleArray from "../../utils/shuffleArray";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

type TracklistProps = {
  tracks: ITrack[];
};

export default function Tracklist({ tracks }: TracklistProps) {
  const timeAgo = new TimeAgo("en-US");
  const {
    isPlaying,
    currentTrack,
    setCurrentTrack,
    setCurrentTrackIndex,
    setIsPlaying,
    setTracklist,
    tracklist,
    setShuffledTracklist,
  } = useContext(TrackContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const { address } = useAccount();

  const handleSelectTrack = (track: ITrack) => {
    if (tracks !== tracklist) {
      const shuffledTracks = shuffleArray([...tracks]);
      setTracklist(tracks);
      setShuffledTracklist(shuffledTracks);
    }
    setCurrentTrack(track);
    setCurrentTrackIndex(tracks.indexOf(track));
    setIsPlaying(true);
  };

  return (
    <div className="w-[895px] mx-auto">
      <div className="flex flex-col space-y-4 min-h-[calc(100vh-160px)]">
        <div className="w-full">
          <div className="flex items-center">
            <div className="w-[46px]"></div>
            <div className="p-[9px]">
              <div className="w-[52px]">Cover</div>
            </div>
            <div className="w-[191px] pl-2">Track</div>
            <div className="w-[130px] pl-6 text-left">Released</div>
            <div className="w-[200px] pl-6 text-center">Platform</div>
            <div className="w-[66px]">Favorite</div>
            <div className="w-[138px] text-center">Share</div>
          </div>
          {tracks &&
            tracks.map((track) => (
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
                                width="2.5"
                                height="19"
                                rx="2"
                                x="3"
                              />
                              <rect
                                className="loading-bar-middle"
                                width="2.5"
                                height="19"
                                rx="2"
                                x="8"
                              />
                              <rect
                                className="loading-bar"
                                width="2.5"
                                height="19"
                                rx="2"
                                x="13"
                              />
                            </g>
                          </svg>
                        </div>
                      ) : (
                        <div className="cursor-pointer hover:scale-125 flex justify-center items-center transition-all duration-300 transform rounded-full w-[38px] h-[38px]">
                          <img
                            loading="lazy"
                            alt="Play Button"
                            src="/icons/Play_Controls.svg"
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
                  <div className="flex items-center w-[190px] ">
                    <div className="flex flex-col justify-center w-full ml-2 ">
                      <Link href={`/tracks/${track.slug}`}>
                        <div className="truncate w-full hover:underline">
                          {track.title}
                        </div>
                      </Link>
                      <div className="text-whiteDisabled truncate w-full hover:underline ">
                        <Link href={`/artists/${track.artist?.slug}`}>
                          {track.artist.name}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="w-[140px] flex items-center justify-left pl-6 h-[72px]">
                    {timeAgo.format(new Date(track.createdAtTime || 0))}
                  </div>
                  <div className="w-[200px] flex items-center justify-center h-[70px] capitalize">
                    {track.platformId}
                  </div>
                  <div className="w-[60px] flex items-center pr-3 justify-center h-[70px]">
                    <div className="cursor-pointer hover:scale-125 transition-all select-none">
                      {favorites.includes(track.id) ? (
                        <img
                          src="/icons/SmallHeartFilled.svg"
                          alt="Heart Filled"
                          className="w-[14px]"
                          onClick={() => removeFavorite(track.id)}
                        />
                      ) : (
                        <img
                          src="/icons/SmallHeart.svg"
                          alt="Heart Empty"
                          className={`${!address && "cursor-default"} w-[14px]`}
                          onClick={() => addFavorite(track.id)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    {/*<div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 pt-[2px] select-none">
                      collect
                    </div>*/}
                    <div className="cursor-pointer hover:scale-125 transition-all p-2 select-none">
                      <img
                        alt="Small Share"
                        src="/icons/SmallShare.svg"
                        className="w-[14px]"
                      />
                    </div>
                  </div>
                  <div className="w-[60px] flex items-center justify-center h-[70px]">
                    <div className="bg-transparent p-2 hover:scale-125 transition-all cursor-pointer duration-300">
                      <img
                        src="/icons/SmallThreeDots.svg"
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
