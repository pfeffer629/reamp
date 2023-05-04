import { useState, useEffect } from "react";
import { BidModal } from "@reservoir0x/reservoir-kit-ui";
import { useAccount } from "wagmi";
import Image from "next/image";
import { BigNumber } from 'ethers';

import { SoundClient } from "@soundxyz/sdk";

function CollectButton({ track }) {
  const [collectionId, setCollectionId] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [samEdition, setSamEdition] = useState({});
  const account = useAccount();

  const client = SoundClient({
    async signer() {
      const signer = await account.connector.getSigner();
      // You need to validate that this situation doesn't really happen on a normal flow
      if (!signer) throw Error("Missing signer");

      return signer;
    },
  });

  useEffect(() => {
    if (Object.keys(track).length > 0) {
      const parsedTrack = track.id.split("/");
      setCollectionId(parsedTrack[1]);
      setTokenId(parsedTrack[2]);
      if (track.platformId === "sound") {
        getSamAddress();
      }
    }
  }, [track]);

  async function getSamAddress() {
    const samEdition = await client.edition.sam({
      editionAddress: collectionId,
    });
    setSamEdition(samEdition)
    const samAddress = await samEdition.contract.samAddress;
    const samInfo = await samEdition.contract.info;

    console.log(client);
    console.log(samEdition);
    console.log(samAddress);
    console.log(samInfo);
  }

  async function buyTrack() {
    const buyPrice = await samEdition.contract.totalBuyPrice({
      // Offset used as buffer for handling concurrent sales
      // and reducing the possibility of failed transactions
      offset: 0,
     
      // How many tokens to be estimated for Buy
      quantity: 1,
    })
    console.log(buyPrice)
    console.log(buyPrice.total.toNumber())
    const purchaseTransaction = await samEdition.contract.buy({
    //   // How many to be purchased
      quantity: 1,
     
    //   // Price to be attempted
      price: buyPrice.total,
     
    //   // Optional attribution identifier
    //   //   attributonId?: BigNumberish
     
    //   // Optional affiliate address
    //   //   affiliate: string
    //   // Optional affiliate proof
    //   //   affiliateProof: BytesLike[]
     
    //   // Customize contract's call gas-related attributes
    //   //   gasLimit: BigNumberish
    //   //   maxFeePerGas: BigNumberish
    //   //   maxPriorityFeePerGas: BigNumberish
    })
  }

  return (
    <>
      {track.platformId === "sound" ? (
        <>
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] flex justify-center items-center text-[12px] rounded-[3px] text-black transition-all duration-500 mt-[6px] select-none"
          >
            Collect
          </div>
          <div
            className={showModal ? "relative z-10 mb-[80px]" : "hidden"}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="fixed inset-0 bg-black/[0.6] transition-opacity z-5"></div>
                <div className="z-10 relative w-[450px] bg-sidebarBg p-[30px] border-darkLine border-[1px] rounded-2xl">
                  <h2 className="text-base">Collect Track</h2>
                  <img
                    alt="Close"
                    src="/icons/Close.svg"
                    className="cursor-pointer absolute right-0 top-0 m-[24px]"
                    onClick={() => setShowModal(false)}
                  />
                  <div className="flex">
                    <div className="w-[66px] aspect-square overflow-hidden h-full flex items-center">
                      <Image
                        alt={track.title}
                        height={66}
                        width={66}
                        src={track.lossyArtworkUrl || ""}
                        className="rounded-[5px]"
                      />
                    </div>
                    <div className="flex justify-center flex-col ml-[14px]">
                      <h3 className="font-extrabold text-[22px] leading-6">
                        {track.title}
                      </h3>
                      <p className="text-[12px] text-[#ABABAB] text-left mt-[6px] leading-4">
                        {track.artist.name}
                      </p>
                    </div>
                  </div>
                  <div className="my-[18px] border-b border-darkLine w-full h-1"></div>
                  <div>
                    <p className="flex items-center text-[12px] text-[#B1B1B1] text-left">
                      Contract Address:{" "}
                      <p className="border-darkLine border-[1px] rounded-lg h-[24px] w-[83px] inline-block text-center leading-[24px] ml-[12px]">{`0x..${collectionId.slice(
                        -4
                      )}`}</p>
                    </p>
                    <p>Total: </p>
                  </div>
                  <button
                    className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] mt-[40px] text-sidebarBg"
                    onClick={buyTrack}
                  >
                    Collect Track
                  </button>
                  <p className="text-[12px] text-[#818181] mt-[10px] leading-4">
                    Lowest price available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <BidModal
          trigger={
            <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] flex justify-center items-center text-[12px] rounded-[3px] text-black transition-all duration-500 mt-[6px] select-none">
              Collect
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
      )}
    </>
  );
}

export default CollectButton;
