import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount, useEnsName, useEnsAvatar, useDisconnect } from "wagmi";
import ethAccounts from "../../utils/ethAccounts";
import { supabase } from "../../utils/supabase";
import mixpanel from "mixpanel-browser";

export default function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({
    address: address,
  });
  const { data: ensName } = useEnsName({ address });

  useEffect(() => {
    if (address && !Object.keys(ethAccounts).includes(address)) {
      window.open("https://form.typeform.com/to/i5cEbCte");
      disconnect();
    }
    if (address) {
      logWallet(address);
    }
  }, [address]);

  async function logWallet(address: string) {
    const { data, error } = await supabase
      .from("users")
      .insert({ address: address, ens: ensName, avatar: ensAvatar })
      .match({ address: address })
      .select();

    if (data && data.length === 1) {
      mixpanel.alias(address);
    } else if (error && error.code === "23505") {
      const { error } = await supabase
        .from("users")
        .update({ address: address, ens: ensName, avatar: ensAvatar })
        .match({ address: address })
        .select();

      if (error) {
        throw error;
      }
    }
  }
  return (
    <>
      {!address && (
        <div className="animate-marquee-infinite whitespace-nowrap py-[10px] text-[12px]">
          Reamp.xyz is the homebase to discover, listen, and collect music
          NFTs&nbsp;&nbsp;&nbsp;&nbsp; •&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            className="text-selectedTab underline"
            href="https://form.typeform.com/to/i5cEbCte"
            target="_blank"
          >
            Request access
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;Reamp.xyz is the
          homebase to discover, listen, and collect music
          NFTs&nbsp;&nbsp;&nbsp;&nbsp; •&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            className="text-selectedTab underline"
            href="https://form.typeform.com/to/i5cEbCte"
            target="_blank"
          >
            Request access
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp; Reamp.xyz is the
          homebase to discover, listen, and collect music
          NFTs&nbsp;&nbsp;&nbsp;&nbsp; •&nbsp;&nbsp;&nbsp;&nbsp;
          <a
            className="text-selectedTab underline"
            href="https://form.typeform.com/to/i5cEbCte"
            target="_blank"
          >
            Request access
          </a>
          &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      )}
      {!address && (
        <div className="border-darkLine border-[1px] w-[1280px] absolute left-0"></div>
      )}
      <div className="max-sm:hidden block mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="relative text-searchBarText">
            <input
              type="text"
              className="px-[14px] pl-[34px] rounded-lg w-[380px] h-[41px] pt-[4px] flex items-center bg-blackSecondary relative outline-none ring-0 text-[12px]"
              placeholder="Search web3 music, artists, and collectors"
            />
            <div className="absolute pl-[14px] top-0 pt-[4px] flex items-center justify-center h-[41px]">
              •
            </div>
          </div>
          <div className="min-w-[330px]">
            <div className="flex justify-end">
              <ConnectButton showBalance={false} />
            </div>
          </div>
        </div>
        {(currentRoute === "/" || currentRoute === "/live") && (
          <div className="relative mt-6 text-sm">
            <div className="flex items-center space-x-14 z-10">
              <Link
                className={`${
                  currentRoute === "/"
                    ? "text-selectedTab"
                    : "text-whiteDisabled"
                } cursor-pointer relative z-10 pb-2`}
                href="/"
              >
                ✿ Freshly Minted
              </Link>

              <Link
                className={`${
                  currentRoute === "/live"
                    ? "text-selectedTab"
                    : "text-whiteDisabled"
                } cursor-pointer relative z-10 pb-2`}
                href="/live"
              >
                ✻ Live Activity
              </Link>
            </div>

            {/* white header border*/}
            <div className="absolute bottom-0 w-full h-[2px] bg-whiteDisabled z-0"></div>
            <div
              className={`${
                currentRoute === "/" ? "left-0" : "left-[144px]"
              } bottom-0 w-10 h-[2px] bg-white z-10 opacity-100
               transform transition-all duration-500 absolute w-[124px]
               `}
            ></div>
          </div>
        )}
        {(currentRoute === "/favorites" ||
          currentRoute === "/playlists" ||
          currentRoute === "/collection") && (
          <div className="relative mt-6 text-sm">
            <div className="flex items-center space-x-14 z-10">
              <Link
                className={`${
                  currentRoute === "/favorites"
                    ? "text-selectedTab"
                    : "text-whiteDisabled"
                } cursor-pointer relative z-10 pb-2`}
                href="/favorites"
              >
                <img
                  src="/icons/SmallHeartFilled.svg"
                  alt="Small Heart Filled"
                  className="inline-block"
                />
                &nbsp; My Favorites
              </Link>
              <Link
                className={`${
                  currentRoute === "/playlists"
                    ? "text-selectedTab"
                    : "text-whiteDisabled"
                } cursor-pointer relative z-10 pb-2`}
                href="/playlists"
              >
                ✦ My Playlists
              </Link>
              <Link
                className={`${
                  currentRoute === "/collection"
                    ? "text-selectedTab"
                    : "text-whiteDisabled"
                } cursor-pointer relative z-10 pb-2`}
                href="/collection"
              >
                ❏ My Collection
              </Link>
            </div>
            <div className="absolute bottom-0 w-full h-[2px] bg-whiteDisabled z-0"></div>
            <div
              className={`${currentRoute === "/playlists" && "left-0"} 
              ${currentRoute === "/playlists" && "left-[150px]"} 
              ${currentRoute === "/collection" && "left-[300px]"} cursor-pointer
              bottom-0 w-10 h-[2px] bg-white z-10 opacity-100
               transform transition-all duration-500 absolute w-[124px]
               `}
            ></div>
          </div>
        )}
      </div>
    </>
  );
}
