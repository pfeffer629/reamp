import { useState, useEffect } from "react";
import { BidModal, CollectModal } from "@reservoir0x/reservoir-kit-ui";
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
    (track.platformId == "catalog") ?
    <BidModal
      trigger={
        <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 mt-[6px] select-none">
          collect
        </div>
      }
      collectionId={collectionId}
      tokenId={tokenId}
      onBidComplete={(data) => console.log("Bid Complete")}
      onBidError={(error, data) =>
        console.log("Transaction Error", error, data)
      }
      onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
    />
    :
    <CollectModal
      trigger={
          <button>
            Collect
          </button>
        }
      collectionId={collectionId}
      mode="preferMint"
      onCollectComplete={(data) => {
        console.log('Collect Complete', data)
      }}
      onCollectError={(error, data) => {
        console.log('Collect Error', error, data)
      }}
      onClose={(data, currentStep) => {
        console.log('CollectModal Closed')
      }}
    />
  );
}

export default CollectButton;
