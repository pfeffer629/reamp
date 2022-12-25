import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";
import Player from "../components/Player";
import PlayButton from "../components/Icons/PlayButton";
import { ITrack } from "@spinamp/spinamp-sdk";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);
  const timeAgo = new TimeAgo("en-US");

  useEffect(() => {
    if (!isLoading) {
      setCurrentTrack(tracks[0]);
    }
  }, [isLoading, tracks]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(tracks.indexOf(track));
  };

  const handleBack = () => {
    if (currentTrackIndex === 0) {
      setCurrentTrack(tracks[tracks.length - 1]);
      setCurrentTrackIndex(tracks.length - 1);
    } else {
      setCurrentTrack(tracks[currentTrackIndex - 1]);
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex === tracks.length - 1) {
      setCurrentTrack(tracks[0]);
      setCurrentTrackIndex(0);
    } else {
      setCurrentTrack(tracks[currentTrackIndex + 1]);
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  return (
    <>
      <Head>
        <title>REAMP</title>
        <meta name="description" content="DISCOVER, CONNECT, COLLECT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-[895px] mx-auto py-12">
        <div className="flex items-center justify-between">
          <div className="relative text-searchBarText">
            <input
              type="text"
              className="px-[14px] pl-[34px] rounded-lg w-[380px] h-[41px] pt-[4px] flex items-center bg-blackSecondary relative outline-none ring-0 text-[12px]"
              placeholder="Search web3 artists, collectors, and curators"
            />
            <div className="absolute pl-[14px] top-0 pt-[4px] flex items-center justify-center h-[41px]">
              •
            </div>
          </div>
          <div className="min-w-[330px]">
            <div className="flex items-center justify-end px-4 text-gray-400">
              <div className="flex items-center text-lg cursor-pointer p-1.5 px-6 rounded-lg shadow bg-transparent hover:bg-brown-100 dark:hover:bg-brown-900 text-bgDark dark:text-bg active:bg-brown-300 dark:active:bg-brown-800 transition-all duration-300 select-none">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
                  </g>
                </svg>
                <div className="text-sm tracking-wide ml-3">Login</div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative pt-6">
          <div className="flex items-center space-x-8 z-10">
            <a
              className="text-selectedTab cursor-pointer relative z-10 pb-2"
              href="/"
            >
              ✿ Freshly Minted
            </a>
            <a
              className="text-whiteDisabled cursor-pointer relative z-10 pb-2"
              href="/live"
            >
              ✻ Live Activity
            </a>
          </div>
          <div className="absolute bottom-0 w-full h-[2px] bg-whiteDisabled z-0"></div>
          <div
            className="bottom-0 w-10 h-[2px] bg-white z-10 opacity-100
             transform transition-all duration-500 absolute left-0
             left-0 w-[124px]"
          ></div>
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
            {tracks &&
              tracks.map((track) => (
              <div className="flex flex-col space-y-4">
                <div className="flex w-full item-center bg-black group hover:bg-blackSecondary transition-all rounded-lg">
                  <div className="w-[46px]">
                    <div className="flex items-center h-full justify-center">
                      <div className="cursor-pointer hover:bg-gray-800/80 flex justify-center items-center transition-all duration-300 transform rounded-full w-[38px] h-[38px]">
                        <img
                          loading="lazy"
                          src="/icons/PlayButton.png"
                          className="w-[14px] translate-x-[1px]"
                          onClick={() => handleSelectTrack(track)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-[9px]">
                    <div className="w-[52px] aspect-square overflow-hidden h-full flex items-center">
                      <img
                        src={`${track.lossyArtworkUrl}?img-width=500&img-height=500&img-fit=scale-down&img-quality=100`}
                        className="rounded-[5px]"
                      />
                    </div>
                  </div>
                  <a
                    className="flex items-center w-[191px]"
                    href="/track/0x0bc2a24ce568dad89691116d5b34deb6c203f342/612"
                  >
                    <div className="flex flex-col justify-center w-full pr-2">
                      <div className="truncate w-full">{track.title}</div>
                      <div className="text-whiteDisabled truncate w-full">
                        {track.artist.name}
                      </div>
                    </div>
                  </a>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    3 hours ago
                  </div>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    0
                  </div>
                  <div className="w-[70px] flex items-center justify-center h-[70px]">
                    <div className="flex items-center space-x-1">
                      <div className="font-sans pb-[2px]">Ξ</div>
                      <div>0.59</div>
                    </div>
                  </div>
                  <div className="w-[60px] flex items-center justify-center h-[70px]">
                    <div className="cursor-pointer hover:scale-125 transition-all p-2 hover:bg-slate-800/40 rounded-md select-none">
                      <img src="/icons/HeartFilled.png" className="w-[14px]" />
                    </div>
                  </div>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 pt-[2px] select-none">
                      collect
                    </div>
                  </div>
                  <div className="w-[60px] flex items-center justify-center h-[70px]">
                    <div className="bg-transparent hover:bg-gray-500/30 p-2 transition-all transform rounded-lg cursor-pointer duration-300">
                      <img src="/icons/ThreeDots.png" className="w-[16px]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Player 
        currentTrack={currentTrack} 
        handleBack={handleBack} 
        handleNext={handleNext} 
      />
    </>
  );
}
