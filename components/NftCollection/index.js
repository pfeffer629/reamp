import { useEffect, useState, useContext } from "react";
import { useEnsName, useEnsAvatar } from "wagmi";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import PlayButton from "../Icons/PlayButton";
import { ITrack } from "@spinamp/spinamp-sdk";
import TrackContext from "../../contexts/TrackContext";

export default function NftCollection({ address }) {
  const { setCurrentTrack, setCurrentTrackIndex, setIsPlaying, setTracklist } =
    useContext(TrackContext);

  const [nfts, setNfts] = useState([]);
  const { data: ensAvatar } = useEnsAvatar({
    address: address,
  });
  const { data: ensName } = useEnsName({ address });
  const { data, isFetching } = useEvmWalletNFTs({ address });
  const svgAvatar = `pfp/Reamp_pfp_${
    ["blue", "green", "orange", "yellowpink"][Math.floor(Math.random() * 4)]
  }.svg`;

  useEffect(() => {
    if (!isFetching && data && data?.length > 0) {
      setNfts(
        data.filter((nft) => nft._data.metadata?.losslessAudio?.length > 0)
      );
    }
  }, [data, isFetching]);

  const handleSelectTrack = (track) => {
    const formattedTrack = {
      id: track.tokenHash,
      title: track.name,
      artist: {
        name: track.artist,
      },
      lossyAudioUrl: track.losslessAudio.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      ),
      lossyArtworkUrl: track.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
      description: track.description,
    };
    setCurrentTrack(formattedTrack);
    setTracklist([formattedTrack]);
    setCurrentTrackIndex(0);
    setIsPlaying(true);
  };

  return (
    <>
      {nfts.length > 0 &&
        nfts.map((nft) => (
          <div
            key={nft._data.tokenId}
            className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
          >
            <div className="relative inline">
              <img
                src={nft._data.metadata.image.replace(
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
                onClick={() => handleSelectTrack(nft._data.metadata)}
              />
            </div>
            <div className="pt-2">
              <div className="text-whiteDisabled text-[11px]">TRACK</div>
            </div>
            <div className="text-white text-[20px]">
              {nft._data.metadata.artist}
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
