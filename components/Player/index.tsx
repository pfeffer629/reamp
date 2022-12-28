import { useState, useEffect, useRef, useContext } from "react";
import PauseButton from "../Icons/PauseButton";
import PlayButton from "../Icons/PlayButton";
import BackButton from "../Icons/BackButton";
import NextButton from "../Icons/NextButton";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player/lazy";
import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";

const AudioPlayer = dynamic(() => import("./AudioPlayer"), { ssr: false });

import TrackContext from "../../contexts/TrackContext";

export default function Player() {
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const {
    currentTrack,
    setCurrentTrack,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
  } = useContext(TrackContext);
  const { tracks } = usePaginatedTracksQuery(40);

  const convertToMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;
    if (isNaN(minutes) || isNaN(remainingSeconds)) return "0:00";
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${Math.floor(
      remainingSeconds
    )}`;
  };

  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    setInterval(() => {
      if (playerRef && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        setElapsed(currentTime);
      }
    }, 100);

    return;
  }, [playerRef]);

  useEffect(() => {
    if (playerRef && playerRef.current) {
      setDuration(playerRef.current.getDuration());
    }
  }, [playerRef, currentTrack]);

  const handleOnReady = () => {
    if (playerRef && playerRef.current) {
      console.log(playerRef.current.getDuration());

      setDuration(playerRef.current.getDuration());
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
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

  const seekTo = (time: number) => {
    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  return (
    <>
      <div className="fixed min-w-[1280px] bg-[#000] h-[80px] w-full bottom-0 flex justify-center items-center px-[22px] font-Gilroy">
        <div className="flex w-[360px]">
          {currentTrack?.lossyArtworkUrl && (
            <Image
              alt={currentTrack?.title}
              height={64}
              width={64}
              src={currentTrack?.lossyArtworkUrl || ""}
              className="mr-[22px] rounded-[5px]"
            />
          )}
          <div>
            <p className="text-sm font-extrabold">{currentTrack?.title}</p>
            <p className="text-xs text-whiteDisabled">{currentTrack?.artist?.name}</p>
            <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 mt-[6px] select-none">
              collect
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full my-[18px]">
          <div className="flex items-center">
            <BackButton className="cursor-pointer" onClick={handleBack} />
            <div className="mx-[30px] cursor-pointer" onClick={handlePlayPause}>
              {!isPlaying ? (
                <PlayButton width={16} height={16} />
              ) : (
                <PauseButton width={16} height={16} />
              )}
            </div>
            <NextButton className="cursor-pointer" onClick={handleNext} />
          </div>
          <div className="flex w-full justify-center max-w-[560px] items-center mt-[8px]">
            <span className="mr-[20px] text-xs">{convertToMinutes(elapsed)}</span>
            <input
              type="range"
              className="w-full h-full"
              step={1}
              min={0}
              max={duration || 0}
              value={elapsed || 0}
              onMouseDown={() => null}
              onMouseUp={() => null}
              onChange={(e) => {
                seekTo(parseFloat(e.target.value) || 0);
              }}
            />
            <span className="ml-[20px] text-xs">{convertToMinutes(duration)}</span>
          </div>
        </div>
        <div className="w-[360px] flex items-center justify-end">
          <img
            alt="Small Share"
            src="/icons/SmallShare.png"
            className="mr-[16px] cursor-pointer"
          />
          <img
            alt="Volume"
            src="/icons/Volume.png"
            className="cursor-pointer"            
          />
          <input
            type="range"
            className="w-24 h-full mx-[12px]"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <img
            alt="Small Three Dots"
            src="/icons/SmallThreeDots.png"
            className="mr-[12px] cursor-pointer"
          />
        </div>
      </div>
      <div className="invisible h-0 w-0">
        <AudioPlayer
          url={currentTrack.lossyAudioUrl}
          playerRef={playerRef}
          onReady={handleOnReady}
          playing={isPlaying}
          volume={volume}
        />
      </div>
    </>
  );
}
