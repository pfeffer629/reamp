import { useAccount } from "wagmi";
import NftCollection from "../components/NftCollection";
import CardLayout from "../components/CardLayout";
import Onboarding from "../components/Onboarding";
import { useCollectionQuery } from "@spinamp/spinamp-hooks";

export default function Collection() {
  const { address } = useAccount();

  const smallHeartFilled = <img
    src="/icons/SmallHeartFilled.svg"
    alt="Heart Filled"
    className="w-[32px]"
  />

  function hasCollection() {
    if (address) {
      const { data } = useCollectionQuery(address);
      return data && data.length > 0;
    }
    else {
      return false;
    }
  }

  return (
    hasCollection() ?
    <CardLayout>
      {address && <NftCollection address={address} />}
    </CardLayout>
    : <Onboarding icon={smallHeartFilled} text={"You haven't collected any tracks yet"} cta={"Collect your first track"} ctaLink={"/"}/>
  );
}
