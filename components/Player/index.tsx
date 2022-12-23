import {useState, useEffect, useRef} from 'react';
import ReactPlayer from 'react-player'
import { ITrack } from "@spinamp/spinamp-sdk";
import PauseButton from '../Icons/PauseButton';
import PlayButton from '../Icons/PlayButton';
import BackButton from '../Icons/BackButton';
import NextButton from '../Icons/NextButton';
import Image from 'next/image';

type PlayerProps = {
  currentTrack: ITrack;
  handleNext?: React.MouseEventHandler<SVGSVGElement>;
  handleBack?: React.MouseEventHandler<SVGSVGElement>;
}

export default function Player({currentTrack, handleNext, handleBack}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

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
    const timer = setInterval(() => {
      if (playerRef && playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime()
        setElapsed(currentTime);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [playerRef]);

  useEffect(() => {
    if (playerRef && playerRef.current) {
      setDuration(playerRef.current.getDuration())
    }
  }, [playerRef, currentTrack]);

  const handleOnReady = () => {
    if (playerRef && playerRef.current) {
      setDuration(playerRef.current.getDuration())
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const seekTo = (time: number) => {
    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  return (
    <>
      <div className="fixed bg-[#000] h-[80px] w-full bottom-0 flex justify-center items-center px-[22px]">
        <div className="flex w-1/5">
          <Image
            alt={currentTrack?.title}
            height={48}
            width={48}
            src={currentTrack?.lossyArtworkUrl || ''}
            className="mr-[22px]"
          />
          <div>
            <p>{currentTrack?.title}</p>
            <p>{currentTrack?.artist?.name}</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-4/5">
          <div className="flex items-center">
            <BackButton className="cursor-pointer" onClick={handleBack} />
            <div className="mx-[30px] my-[18px] cursor-pointer" onClick={handlePlayPause}>
              {!isPlaying ? <PlayButton /> : <PauseButton />}
            </div>
            <NextButton className="cursor-pointer" onClick={handleNext} />
          </div>
          <div className="flex w-full justify-center">
            <span className="w-[12px] mr-[20px]">{convertToMinutes(elapsed)}</span>
            <input 
              type="range" 
              className="w-full max-w-[430px] h-full mt-2"
              step={1}
              min={0}
              max={duration}
              value={elapsed || 0}
              onMouseDown={() => null}
              onMouseUp={() => null}
              onChange={(e) => {
                seekTo(parseFloat(e.target.value) || 0);
              }}
            />
            <span className="w-[12px] ml-[20px]">{convertToMinutes(duration)}</span>
          </div>
        </div>
        <div className="w-1/5">
        hello
        </div>
      </div>
      <div className="hidden"> 
        <ReactPlayer
          ref={playerRef}
          url={currentTrack?.lossyAudioUrl} 
          onReady={handleOnReady} 
          playing={isPlaying}
        />
      </div>
    </>
  );
}
