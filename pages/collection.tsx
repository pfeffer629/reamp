import { useAccount } from "wagmi";
import NftCollection from "../components/NftCollection";

export default function Collection() {
  const { address } = useAccount();

  return (
    <div className="max-sm:px-[21px] flex max-sm:justify-center items-center max-sm:mb-[140px]">
      <div className="py-4 flex flex-wrap max-sm:grid max-sm:grid-flow-dense max-sm:grid-cols-2 justify-items-center">
        {address && <NftCollection address={address} />}
      </div>
    </div>
  );
}
