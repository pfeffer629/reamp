import { useState, useEffect } from "react";
import { BidModal } from "@reservoir0x/reservoir-kit-ui";
import TrackContext from "../../contexts/TrackContext";

function CollectButton({ track }) {
  const [collectionId, setCollectionId] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (Object.keys(track).length > 0) {
      const parsedTrack = track.id.split("/");
      setCollectionId(parsedTrack[1]);
      setTokenId(parsedTrack[2]);
    }
  }, [track]);

  return (
    <BidModal
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
