import { useAccount } from "wagmi";
import NftCollection from "../components/NftCollection";

export default function Collection() {
  const { address } = useAccount();

  return (
    <div className="flex flex-col space-y-4">
      <div className="py-4 flex flex-wrap">
        {address && <NftCollection address={address} />}
      </div>
    </div>
  );
}
