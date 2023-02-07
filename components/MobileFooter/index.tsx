import { useRouter } from "next/router";
import Link from "next/link";

export default function MobileFooter() {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="fixed w-full bottom-0">
      <div className="relative flex justify-center py-6 text-sm bg-black">
        <div className="flex items-center space-x-14 z-10">
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

        {/* white header border*/}
        <div className="absolute top-0 w-full h-[2px] bg-whiteDisabled z-0"></div>
        <div
          className={`${
            currentRoute === "/" ? "left-0" : "left-1/2"
          } top-0 w-1/2 h-[2px] bg-white z-10 opacity-100
           transform transition-all duration-500 absolute w-1/2
           `}
        ></div>
      </div>
      <div className="flex h-[64px] items-center justify-around bg-sidebarBg">
        {currentRoute === "/" || currentRoute === "live" ? (
          <img
            alt="Blue Globe"
            src="/icons/GlobeBlue.svg"
            className="mr-[12px] h-[21px] w-[21px] cursor-pointer"
          />
        ) : (
          <img
            alt="Globe"
            src="/icons/Globe.svg"
            className="mr-[12px] h-[21px] w-[21px] cursor-pointer"
          />
        )}
        <img
          alt="Playing"
          src="/icons/Playing.svg"
          className="mr-[12px] h-[21px] w-[21px] cursor-pointer"
        />
        <img
          alt="Playlists"
          src="/icons/Playlists.svg"
          className="h-[21px] w-[21px] cursor-pointer"
        />
      </div>
    </div>
  );
}
