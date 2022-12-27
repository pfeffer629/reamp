import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="mx-auto py-4">
      <div className="flex items-center justify-between">
        <div className="relative text-searchBarText">
          <input
            type="text"
            className="px-[14px] pl-[34px] rounded-lg w-[380px] h-[41px] pt-[4px] flex items-center bg-blackSecondary relative outline-none ring-0 text-[12px]"
            placeholder="Search web3 artists, collectors, and curators"
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
      <div className="relative mt-4">
        <div className="flex items-center space-x-8 z-10">
          <Link
            className={`${
              currentRoute === "/" ? "text-selectedTab" : "text-whiteDisabled"
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
        <div className="absolute bottom-0 w-full h-[2px] bg-whiteDisabled z-0"></div>
        <div
          className={`${
            currentRoute === "/" ? "left-0" : "left-[150px]"
          } bottom-0 w-10 h-[2px] bg-white z-10 opacity-100
           transform transition-all duration-500 absolute w-[124px]
           `}
        ></div>
      </div>
    </div>
  );
}
