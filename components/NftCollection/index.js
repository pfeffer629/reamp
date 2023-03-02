import { useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useEnsName, useEnsAvatar } from "wagmi";
import { useCollectionQuery } from "@spinamp/spinamp-hooks";
import PlayButton from "../Icons/PlayButton";
import Image from "next/image";
import TrackContext from "../../contexts/TrackContext";

export default function NftCollection({ address }) {
  const { setCurrentTrack, setCurrentTrackIndex, setIsPlaying, setTracklist } =
    useContext(TrackContext);
  const router = useRouter();

  const { data: ensAvatar } = useEnsAvatar({
    address: address,
  });
  const { data, error, isLoading } = useCollectionQuery(address);
  const { data: ensName } = useEnsName({ address });
  const svgAvatar = useMemo(
    () =>
      `pfp/Reamp_pfp_${
        ["blue", "green", "orange", "yellowpink"][Math.floor(Math.random() * 4)]
      }.svg`,
    []
  );

  if (isLoading || error) {
    return <div></div>;
  }

  const handleSelectTrack = (track, mobile = false) => {
    setCurrentTrack(track);
    setTracklist([track]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);

    if (mobile) {
      router.push("/playing");
    }
  };

  return (
    <>
      {data.length > 0 &&
        data.map((track) => (
          <div
            key={track.id}
            className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[223px] max-sm:w-auto max-w-full"
          >
            <div className="relative inline max-sm:w-auto">
              <Image
                src={track.lossyArtworkUrl.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )}
                alt="nft"
                className="w-[204px] h-[204px] max-sm:h-auto rounded-[10px]"
                height={204}
                width={204}
              />
              <PlayButton
                className="max-sm:hidden block absolute hover:scale-125 duration-300 ease-in-out top-0 bottom-0 left-0 right-0 m-auto"
                height={25}
                width={20}
                onClick={() => handleSelectTrack(track)}
              />
              <PlayButton
                className="max-sm:block hidden absolute hover:scale-125 duration-300 ease-in-out top-0 bottom-0 left-0 right-0 m-auto"
                height={25}
                width={20}
                onClick={() => handleSelectTrack(track, true)}
              />
            </div>
            <div className="pt-2">
              <div className="text-whiteDisabled text-[12px] uppercase">
                Track
              </div>
            </div>
            <div className="text-white truncate text-[16px]">{track.title}</div>
            <div className="truncate w-full text-whiteDisabled text-[14px] pb-1">
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
