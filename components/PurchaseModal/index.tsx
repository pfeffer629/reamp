import { useReservoirClient } from "@reservoir0x/reservoir-kit-ui";
import { BuyModal } from "@reservoir0x/reservoir-kit-ui";

function PurchaseModal() {
  const client = useReservoirClient();

  return (
    <BuyModal
      trigger={
        <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 mt-[6px] select-none">
          collect
        </div>
      }
      collectionId="0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b"
      tokenId="1236715"
      onPurchaseComplete={(data) => console.log("Purchase Complete")}
      onPurchaseError={(error, data) =>
        console.log("Transaction Error", error, data)
      }
      onClose={(data, stepData, currentStep) => console.log("Modal Closed")}
    />
  );
}

export default PurchaseModal;
