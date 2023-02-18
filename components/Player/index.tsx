import { useState, useEffect, useRef, useContext } from "react";
import PauseButton from "../Icons/PauseButton";
import PlayButton from "../Icons/PlayButton";
import BackButton from "../Icons/BackButton";
import NextButton from "../Icons/NextButton";
import CopiedToClipboard from "../CopiedToClipboard";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player/lazy";
import TrackContext from "../../contexts/TrackContext";
import FavoritesContext from "../../contexts/FavoritesContext";
import PlaylistContext from "../../contexts/PlaylistContext";
import { useAccount } from "wagmi";
import Link from "next/link";

const AudioPlayer = dynamic(() => import("./AudioPlayer"), { ssr: false });

export default function Player() {
  const [copyToClipbard, setCopyToClipbard] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const {
    currentTrack,
    setCurrentTrack,
    currentTrackIndex,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    shuffle,
    shuffleTracks,
    unshuffleTracks,
    tracklist,
    shuffledTracklist,
  } = useContext(TrackContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const { toggleModal } = useContext(PlaylistContext);
  const { address } = useAccount();

  useEffect(() => {
    // window.addEventListener("keydown", (e) => {
    //   if (e.code === "Space") {
    //     e.preventDefault();
    //     setIsPlaying(!isPlaying);
    //   }
    // });
    if ("mediaSession" in navigator) {
      if (Object.keys(currentTrack).length > 0) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentTrack.title,
          artist: currentTrack.artist?.name,
          artwork: [
            { src: currentTrack.lossyArtworkUrl,   sizes: '96x96',   type: 'image/png' },
            { src: currentTrack.lossyArtworkUrl, sizes: '128x128', type: 'image/png' },
            { src: currentTrack.lossyArtworkUrl, sizes: '192x192', type: 'image/png' },
            { src: currentTrack.lossyArtworkUrl, sizes: '256x256', type: 'image/png' },
            { src: currentTrack.lossyArtworkUrl, sizes: '384x384', type: 'image/png' },
            { src: currentTrack.lossyArtworkUrl, sizes: '512x512', type: 'image/png' },
          ]
        });
      }
      navigator.mediaSession.setActionHandler("play", () => {
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        handleBack();
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        handleNext();
        setIsPlaying(true);
      });
    }
  }, [isPlaying, currentTrack]);

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
      setDuration(playerRef.current.getDuration());
    }
  };

  const shareTrack = () => {
    setCopyToClipbard(true);
    navigator.clipboard.writeText(
      `https://beta.reamp.xyz/tracks/${currentTrack.slug}`
    );

    setTimeout(() => {
      setCopyToClipbard(false);
    }, 4000);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBack = () => {
    if (elapsed > 2) {
      seekTo(0);
      return;
    }

    if (currentTrackIndex === 0) {
      if (shuffle) {
        setCurrentTrack(shuffledTracklist[shuffledTracklist.length - 1]);
        setCurrentTrackIndex(shuffledTracklist.length - 1);
      } else {
        setCurrentTrack(tracklist[tracklist.length - 1]);
        setCurrentTrackIndex(tracklist.length - 1);
      }
    } else {
      if (shuffle) {
        setCurrentTrack(shuffledTracklist[currentTrackIndex - 1]);
        setCurrentTrackIndex(currentTrackIndex - 1);
      } else {
        setCurrentTrack(tracklist[currentTrackIndex - 1]);
        setCurrentTrackIndex(currentTrackIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentTrackIndex === tracklist.length - 1) {
      if (shuffle) {
        setCurrentTrack(shuffledTracklist[0]);
        setCurrentTrackIndex(0);
      } else {
        setCurrentTrack(tracklist[0]);
        setCurrentTrackIndex(0);
      }
    } else {
      if (shuffle) {
        setCurrentTrack(shuffledTracklist[currentTrackIndex + 1]);
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setCurrentTrack(tracklist[currentTrackIndex + 1]);
        setCurrentTrackIndex(currentTrackIndex + 1);
      }
    }
  };

  const seekTo = (time: number) => {
    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  return (
    <>
      {copyToClipbard && <CopiedToClipboard />}
      <div className="max-sm:hidden fixed max-sm:w-0 min-w-[1280px] bg-sidebarBg h-[80px] w-full bottom-0 flex justify-center items-center px-[22px] font-Gilroy border-t border-darkLine">
        <div className="flex w-[360px] items-center">
          {currentTrack?.lossyArtworkUrl && (
            <Image
              alt={currentTrack?.title || ""}
              height={64}
              width={64}
              src={currentTrack?.lossyArtworkUrl || ""}
              className="mr-[18px] rounded-[5px] max-h-16"
            />
          )}
          <div>
            {currentTrack.slug && address ? (
              <Link
                className="text-sm font-extrabold hover:underline"
                href={`/tracks/${currentTrack.slug}`}
              >
                {currentTrack?.title}
              </Link>
            ) : (
              <span className="text-sm font-extrabold">
                {currentTrack?.title}
              </span>
            )}
            {currentTrack.artist?.slug && address ? (
              <Link
                className="text-xs text-whiteDisabled hover:underline"
                href={`/artists/${currentTrack.artist?.slug}`}
              >
                <p>{currentTrack?.artist?.name}</p>
              </Link>
            ) : (
              <span className="text-xs text-whiteDisabled">
                <p>{currentTrack?.artist?.name}</p>
              </span>
            )}
            {/*            
            <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 mt-[6px] select-none">
              collect
            </div>
            */}
          </div>
        </div>
        <div className="flex flex-col items-center w-[720px] my-[18px]">
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
          <div className="flex w-full justify-center w-[360px] items-center mt-[8px]">
            {shuffle ? (
              <img
                src="/icons/ShuffleFilled.svg"
                alt="Shuffle"
                className="cursor-pointer mr-[18px]"
                onClick={unshuffleTracks}
              />
            ) : (
              <img
                src="/icons/Shuffle.svg"
                alt="Shuffle"
                className="cursor-pointer mr-[18px]"
                onClick={shuffleTracks}
              />
            )}
            {favorites.includes(currentTrack.id) ? (
              <img
                src="/icons/HeartFilled2.svg"
                alt="Heart Filled"
                className={`${
                  !address && "cursor-default"
                } cursor-pointer mr-[16px]`}
                onClick={() => removeFavorite(currentTrack.id)}
              />
            ) : (
              <img
                src="/icons/HeartControls.svg"
                alt="Heart Empty"
                className={`${
                  !address && "cursor-default"
                } cursor-pointer mr-[16px]`}
                onClick={() => addFavorite(currentTrack.id)}
              />
            )}
            <span className="mr-[18px] text-xs">
              {convertToMinutes(elapsed)}
            </span>
            <input
              type="range"
              className="w-full h-[8px] border-radius-0 border-white-500"
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
            <span className="ml-[20px] text-xs">
              {convertToMinutes(duration)}
            </span>
            {repeat ? (
              <img
                src="/icons/RepeatOnce.svg"
                alt="Repeat Once"
                className="cursor-pointer ml-[18px]"
                onClick={() => setRepeat(false)}
              />
            ) : (
              <img
                src="/icons/Repeat.svg"
                alt="Repeat"
                className="cursor-pointer ml-[18px]"
                onClick={() => setRepeat(true)}
              />
            )}
            <img
              src="/icons/Playlist.svg"
              alt="Add To Playlist"
              className="cursor-pointer ml-[16px]"
              onClick={() => toggleModal(currentTrack)}
            />
          </div>
        </div>
        <div className="w-[360px] flex items-center justify-end">
          <img
            alt="Small Share"
            src="/icons/SmallShare.svg"
            className="mr-[12px] cursor-pointer"
            onClick={shareTrack}
          />
          {/* 
          <img
            alt="Add to Queue"
            src="/icons/Add_to_Queue.svg"
            className="mr-[12px] cursor-pointer"
            />*/}
          <img
            alt="Volume"
            src="/icons/Volume.svg"
            className="cursor-pointer"
          />
          <input
            type="range"
            className="w-16 h-full mx-[12px]"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
          <div className="mr-[12px] bg-transparent hover:bg-gray-500/30 p-2 transition-all transform rounded-lg cursor-pointer duration-300">
            <img alt="Small Three Dots" src="/icons/SmallThreeDots.svg" />
          </div>
        </div>
      </div>
      <div className="max-sm:block hidden w-full text-center mb-[98px]">
        {currentTrack?.lossyArtworkUrl && (
          <img
            alt={currentTrack?.title || ""}
            src={currentTrack?.lossyArtworkUrl || ""}
            className="w-full mr-[18px] rounded-[5px] p-[24px]"
          />
        )}
        <p className="font-extrabold text-[26px]">{currentTrack?.title}</p>
        <p className="text-[16px] text-whiteDisabled">
          {currentTrack?.artist?.name}
        </p>
        <div className="p-[34px] pb-[12px]">
          <div className="flex justify-center items-center py-[34px] w-full">
            {favorites.includes(currentTrack.id) ? (
              <img
                src="/icons/HeartFilled2.svg"
                alt="Heart Filled"
                className={`${
                  !address && "cursor-default"
                } cursor-pointer mr-auto`}
                onClick={() => removeFavorite(currentTrack.id)}
              />
            ) : (
              <img
                src="/icons/HeartControls.svg"
                alt="Heart Empty"
                className={`${
                  !address && "cursor-default"
                } cursor-pointer mr-auto`}
                onClick={() => addFavorite(currentTrack.id)}
              />
            )}
            <BackButton
              className="cursor-pointer"
              height={24}
              width={28}
              onClick={handleBack}
            />
            <div className="mx-[30px] cursor-pointer" onClick={handlePlayPause}>
              {!isPlaying ? (
                <PlayButton width={32} height={40} />
              ) : (
                <PauseButton width={32} height={40} />
              )}
            </div>
            <NextButton
              className="cursor-pointer"
              height={24}
              width={28}
              onClick={handleNext}
            />
            <div className="ml-auto cursor-pointer">
              <img alt="Small Three Dots" src="/icons/SmallThreeDots.svg" />
            </div>
          </div>
          <input
            type="range"
            className="w-full h-[8px] border-radius-0 border-white-500"
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
        </div>
        <div className="flex justify-between px-[34px]">
          <span className="font-extrabold text-xs">
            {convertToMinutes(elapsed)}
          </span>
          <span className="font-extrabold text-xs">
            {convertToMinutes(duration)}
          </span>
        </div>
        <div className="flex w-full justify-around mt-[34px]">
          {shuffle ? (
            <img
              src="/icons/ShuffleFilled.svg"
              alt="Shuffle"
              className="cursor-pointer h-[20px]"
              onClick={unshuffleTracks}
            />
          ) : (
            <img
              src="/icons/Shuffle.svg"
              alt="Shuffle"
              className="cursor-pointer h-[20px]"
              onClick={shuffleTracks}
            />
          )}
          {repeat ? (
            <img
              src="/icons/RepeatOnce.svg"
              alt="Repeat Once"
              className="cursor-pointer h-[20px]"
              onClick={() => setRepeat(false)}
            />
          ) : (
            <img
              src="/icons/Repeat.svg"
              alt="Repeat"
              className="cursor-pointer h-[20px]"
              onClick={() => setRepeat(true)}
            />
          )}
          <img
            alt="Playlists"
            src="/icons/Playlists.svg"
            className="cursor-pointer h-[20px]"
          />
          <img
            src="/icons/Playlist.svg"
            alt="Add To Playlist"
            className="cursor-pointer h-[20px]"
            onClick={() => toggleModal(currentTrack)}
          />
          <img
            alt="Small Share"
            src="/icons/SmallShare.svg"
            className="cursor-pointer h-[20px]"
            onClick={shareTrack}
          />
          {/* 
          <img
            alt="Add to Queue"
            src="/icons/Add_to_Queue.svg"
            className="mr-[12px] cursor-pointer"
            />*/}
        </div>
      </div>
      <div className="invisible h-0 w-0">
        <AudioPlayer
          url={currentTrack.lossyAudioUrl}
          playerRef={playerRef}
          onReady={handleOnReady}
          playing={isPlaying}
          volume={volume}
          onEnded={handleNext}
          loop={repeat}
        />
      </div>
    </>
  );
}
