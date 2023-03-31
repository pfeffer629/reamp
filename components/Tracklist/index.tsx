import { useContext, useState } from "react";
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
TimeAgo.addDefaultLocale(en);

type TracklistProps = {
  tracks: ITrack[];
};

export default function Tracklist({ tracks }: TracklistProps) {
  const timeAgo = new TimeAgo("en-US");
  const [copyToClipbard, setCopyToClipbard] = useState(false);
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

  const { setSelectedTrack } = useContext(TrackActionContext);

  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const { address } = useAccount();
  const router = useRouter();

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

  return (
    <div className="max-sm:w-full max-sm:mb-[140px] mb-0 w-[895px] mx-auto">
      {copyToClipbard && <CopiedToClipboard />}
      <div className="flex flex-col space-y-4 min-h-[calc(100vh-160px)]">
        <div className="w-full">
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
            tracks.map((track) => (
              <div className="flex flex-col space-y-4" key={track.id}>
                <div className="flex w-full item-center bg-black group hover:bg-blackSecondary transition-all rounded-lg">
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
                  <div className="max-sm:w-auto max-sm:pr-[24px] w-[60px] flex items-center justify-center h-[70px]">
                    <div className="bg-transparent p-2 hover:scale-125 transition-all cursor-pointer duration-300">
                      <img
                        src="/icons/SmallThreeDots.svg"
                        alt="Three Dots"
                        className="w-[16px]"
                        onClick={() => setSelectedTrack(track)}
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
