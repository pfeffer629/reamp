import { useAccount } from "wagmi";
import NftCollection from "../components/NftCollection";
import CardLayout from "../components/CardLayout";

export default function Collection() {
  const { address } = useAccount();

  return (
    <CardLayout>
        {address && <NftCollection address={address} />}
    </CardLayout>
  );
}
