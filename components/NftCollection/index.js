import { useEffect, useState, useContext, useMemo } from "react";
import { useEnsName, useEnsAvatar } from "wagmi";
import { useCollectionQuery } from "@spinamp/spinamp-hooks";
import PlayButton from "../Icons/PlayButton";
import { ITrack } from "@spinamp/spinamp-sdk";
import TrackContext from "../../contexts/TrackContext";

export default function NftCollection({ address }) {
  const { setCurrentTrack, setCurrentTrackIndex, setIsPlaying, setTracklist } =
    useContext(TrackContext);

  const { data: ensAvatar } = useEnsAvatar({
    address: address,
  });
  const { data, error, isLoading } = useCollectionQuery(address);
  const { data: ensName } = useEnsName({ address });
  const svgAvatar = useMemo(() => `pfp/Reamp_pfp_${
    ["blue", "green", "orange", "yellowpink"][Math.floor(Math.random() * 4)]
  }.svg`, []);

  if (isLoading || error) {
    return <div></div>;
  }

  const handleSelectTrack = (track) => {
    setCurrentTrack(track);
    setTracklist([track]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
  };

  return (
    <>
      {data.length > 0 &&
        data.map((track) => (
          <div
            key={track.id}
            className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
          >
            <div className="relative inline">
              <img
                src={track.lossyArtworkUrl.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )}
                alt="playlist"
                className="w-[204px] h-[210px] rounded-[10px]"
              />
              <PlayButton
                className="absolute top-0 bottom-0 left-0 right-0 m-auto"
                height={25}
                width={20}
                onClick={() => handleSelectTrack(track)}
              />
            </div>
            <div className="pt-2">
              <div className="text-whiteDisabled text-[11px]">TRACK</div>
            </div>
            <div className="text-white text-[20px]">
              {track.artist.name}
            </div>
            <div className="flex flex-row items-center space-x-[9px]">
              <img
                src={ensAvatar || svgAvatar}
                alt="user"
                className="w-[21px] aspect-square rounded-[10px]"
              />
              &nbsp;{ensName}
            </div>
          </div>
        ))}
    </>
  );
}
