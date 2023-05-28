import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ITrack } from "@spinamp/spinamp-sdk";
import TrackContext from "../../contexts/TrackContext";
import TrackActionContext from "../../contexts/TrackActionContext";
import Link from "next/link";
import { useAccount } from "wagmi";
import FavoritesContext from "../../contexts/FavoritesContext";
import shuffleArray from "../../utils/shuffleArray";
import CopiedToClipboard from "../../components/CopiedToClipboard";
import PlayingIcon from "../../components/Icons/PlayingIcon";
import { useRouter } from "next/navigation";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import TrackPopUp from "../TrackPopUp";
TimeAgo.addDefaultLocale(en);

type TracklistProps = {
  tracks: ITrack[];
  playlistOptions?: boolean;
};

export default function Tracklist({ tracks, playlistOptions }: TracklistProps) {
  const timeAgo = new TimeAgo("en-US");
  const mobileSize = 640;
  const [copyToClipbard, setCopyToClipbard] = useState(false);
  const [trackPopUp, setTrackPopUp] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [optionsPosition, setOptionsPosition] = useState({});
  const trackPopUpRef = useRef<HTMLDivElement>(null);

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

  const { selectedTrack, setSelectedTrack } = useContext(TrackActionContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const { address } = useAccount();
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const threeDotsRef = useRef<HTMLDivElement>(null);

  const shareTrack = (slug) => {
    setCopyToClipbard(true);
    navigator.clipboard.writeText(`https://beta.reamp.xyz/tracks/${slug}`);
    setTimeout(() => {
      setCopyToClipbard(false);
    }, 4000);
  };

  const handleSelectTrack = (track: ITrack, mobile = false) => {
    if (tracks !== tracklist) {
      const shuffledTracks = shuffleArray([...tracks]);
      setTracklist(tracks);
      setShuffledTracklist(shuffledTracks);
    }
    setCurrentTrack(track);
    setCurrentTrackIndex(tracks.indexOf(track));
    setIsPlaying(true);

    if (mobile) {
      router.push("/playing");
    }
  };

  const handleThreeDots = (track, index, mobile = false, rightClick = false) => {
   setSelectedTrack(track);
   setSelectedIndex(index);

   if (!rightClick) {
    setOptionsPosition({});
   }

   if (!mobile) {
    setTrackPopUp(!trackPopUp);
   } 
  }

  const handleRightClick = (event, track, index) => {
    event.preventDefault();
    const { right, top } = event.currentTarget.getBoundingClientRect();
    setOptionsPosition({x: right - event.clientX - 214, y: -top + event.clientY - 35});
    handleThreeDots(track, index, false, true);
  }

  
  const handleClickOutside = (event) => {
    if (trackPopUpRef.current 
      && !trackPopUpRef.current.contains(event.target)) {
      setTrackPopUp(false);
    }
    
    trackRef.current && !trackRef.current.contains(event.target) && setSelectedTrack({});
  }
  
  const handleTrackClick = (event, track: ITrack, mobile = false) => {
    (event.detail == 2 || mobile) ? handleSelectTrack(track, mobile) : setSelectedTrack(track);
  }

  useEffect(() => {
    // add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // remove event listener when the component unmounts
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    
  return (
    <div className="max-sm:w-full max-sm:mb-[140px] mb-0 w-[895px] mx-auto">
      {copyToClipbard && <CopiedToClipboard />}
      <div className="flex flex-col space-y-4 min-h-[calc(100vh-160px)]">
        <div className="w-full" ref={trackRef}>
          <div className="flex items-center max-sm:hidden block">
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
            tracks.map((track, index) => (
              <div className="flex flex-col space-y-4" key={index} onClick={(e) => handleTrackClick(e, track, window.innerWidth <= mobileSize)} onContextMenu={(event) => handleRightClick(event, track, index)}>
                <div className={`flex w-full item-center bg-black group hover:bg-blackSecondary transition-all rounded-lg ${selectedTrack == track ? 'bg-blackSecondary' : ''}`}>
                  <div className="w-[46px] max-sm:ml-[8px]">
                    <div className="flex items-center h-full justify-center">
                      {currentTrack.id === track.id && isPlaying ? (
                        <div className="flex justify-center items-center w-[38px] h-[38px]">
                          <PlayingIcon />
                        </div>
                      ) : (
                        <div className="cursor-pointer hover:scale-125 flex justify-center items-center transition-all duration-300 transform rounded-full w-[38px] h-[38px]">
                          <img
                            loading="lazy"
                            alt="Play Button"
                            src="/icons/Play_Controls.svg"
                            className="max-sm:hidden block w-[14px] translate-x-[1px]"
                            onClick={() => handleSelectTrack(track)}
                          />
                          <img
                            loading="lazy"
                            alt="Play Button"
                            src="/icons/Play_Controls.svg"
                            className="max-sm:block hidden w-[14px] translate-x-[1px]"
                            onClick={() => handleSelectTrack(track, true)}
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
                  <div className="flex items-center max-sm:w-2/5 w-[190px] ">
                    <div className="flex flex-col justify-center w-full ml-2 ">
                      {address ? (
                        <Link href={`/tracks/${track.slug}`}>
                          <div className="truncate w-full hover:underline">
                            {track.title}
                          </div>
                        </Link>
                      ) : (
                        <div className="truncate w-full">{track.title}</div>
                      )}
                      <div className="text-whiteDisabled truncate w-full">
                        {address ? (
                          <Link
                            href={`/artists/${track.artist?.slug}`}
                            className="hover:underline"
                          >
                            {track.artist.name}
                          </Link>
                        ) : (
                          <span>{track.artist.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="max-sm:hidden block w-[140px] flex items-center justify-left pl-6 h-[72px]">
                    {timeAgo.format(new Date(track.createdAtTime || 0))}
                  </div>
                  <div className="max-sm:hidden block w-[200px] flex items-center justify-center h-[70px] capitalize">
                    <span className="text-center">
                      {track.platformId
                        .replace(
                          "0x8427e46826a520b1264b55f31fcb5ddfdc31e349",
                          "Chaos"
                        )
                        .replace(
                          "0xe80c7fee3d41e311e0351244231919e04e699e56",
                          "Jagwar Twin"
                        )
                        .replace(
                          "0x719C6d392fc659f4fe9b0576cBC46E18939687a7",
                          "Daniel Allan"
                        )}
                    </span>
                  </div>
                  <div className="max-sm:w-auto max-sm:ml-auto w-[60px] flex items-center pr-3 justify-center h-[70px]">
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
                  <div className="max-sm:hidden block w-[130px] flex items-center justify-center h-[70px]">
                    <div className="cursor-pointer hover:scale-125 transition-all p-2 select-none">
                      <img
                        alt="Small Share"
                        src="/icons/SmallShare.svg"
                        className="w-[14px]"
                        onClick={() => shareTrack(track.slug)}
                      />
                    </div>
                  </div>
                  <div className="max-sm:w-auto max-sm:pr-[24px] w-[60px] flex items-center justify-center h-[70px]"
                  >
                    <div className="relative bg-transparent p-2 transition-all cursor-pointer duration-300" 
                    onClick={() => handleThreeDots(track, index, window.innerWidth <= mobileSize)}>
                      <img 
                        src="/icons/SmallThreeDots.svg"
                        alt="Three Dots"
                        className="w-[16px] hover:scale-125"
                      />
                      {trackPopUp && (index === selectedIndex) 
                      && <div ref={trackPopUpRef}>
                        <TrackPopUp position={optionsPosition} shareTrack={()=>shareTrack(track.slug)} playlistOptions={playlistOptions}/>
                        </div>}
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
