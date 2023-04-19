import { useState, useEffect } from "react";
import { useReservoirClient, useTokens } from "@reservoir0x/reservoir-kit-ui";
import { BuyModal, BidModal } from "@reservoir0x/reservoir-kit-ui";
import { useSigner } from 'wagmi'
import TrackContext from "../../contexts/TrackContext";

function CollectButton({track}) {
  const [collectionId, setCollectionId] = useState("");
  const [tokenId, setTokenId] = useState("");

  const client = useReservoirClient();
  const { data: tokens } = useTokens({
    collection: "0x27F4F83941e1B2a286bcbDc8b5Bf442D99579eFE",
  })

  useEffect(() => {
    if (Object.keys(track).length > 0) {
      const parsedTrack = (track.id.split('/'))
      setCollectionId(parsedTrack[1])
      setTokenId(parsedTrack[2])
    }
  }, [track]);

  return (
    <BuyModal
      trigger={
        <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 mt-[6px] select-none">
          collect
        </div>
      }
      collectionId={collectionId}
      tokenId={tokenId}
      onPurchaseComplete={(data) => console.log("Purchase Complete")}
      onPurchaseError={(error, data) =>
        console.log("Transaction Error", error, data)
      }
      onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
    />
  );
}

export default CollectButton;
