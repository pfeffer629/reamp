import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TrackContext from "../../contexts/TrackContext";

export default function MobileFooter() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { currentTrack } = useContext(TrackContext);

  return (
    <div className="fixed w-full bottom-0">
      <div
        className={
          currentRoute === "/" || currentRoute === "/live"
            ? "relative flex justify-center py-6 text-sm bg-black"
            : "hidden"
        }
      >
        <div className="flex items-center space-x-14 z-10">
          <Link
            className={`${
              currentRoute === "/" ? "text-selectedTab" : "text-whiteDisabled"
            } cursor-pointer relative z-10`}
            href="/"
          >
            ✿ Freshly Minted
          </Link>

          <Link
            className={`${
              currentRoute === "/live"
                ? "text-selectedTab"
                : "text-whiteDisabled"
            } cursor-pointer relative z-10`}
            href="/live"
          >
            ✻ Live Activity
          </Link>
        </div>
        <div className="absolute top-0 w-full h-[2px] bg-whiteDisabled z-0"></div>

        <div
          className={`${
            currentRoute === "/" ? "left-0" : "left-1/2"
          } top-0 w-1/2 h-[2px] bg-white z-10 opacity-100
           transform transition-all duration-500 absolute w-1/2
           `}
        ></div>
      </div>
      {(currentRoute === "/favorites" ||
        currentRoute === "/playlists" ||
        currentRoute === "/collection") && (
        <div className="relative flex justify-center px-2 py-6 text-sm bg-black">
          <div className="flex items-center space-x-14 z-10">
            <span className="text-whiteDisabled">
              <img
                src="/icons/SmallHeart.svg"
                alt="Small Heart Filled"
                className="inline-block"
                height={12}
                width={12}
              />
              &nbsp; My Favorites
            </span>
            <span className="text-whiteDisabled">✦ My Playlists</span>
            <span className="text-whiteDisabled">❏ My Collection</span>
          </div>
          <div className="absolute top-0 w-full h-[2px] bg-whiteDisabled z-0"></div>
          <div
            className="left-50%
            top-0 h-[2px] bg-white z-10 opacity-100
             transform transition-all duration-500 absolute w-1/3"
          ></div>
        </div>
      )}
      <div className="flex h-[64px] items-center justify-around bg-sidebarBg">
        {currentRoute === "/" || currentRoute === "live" ? (
          <img
            alt="Blue Globe"
            src="/icons/GlobeBlue.svg"
            className="mr-[12px] h-[21px] w-[21px] cursor-pointer"
          />
        ) : (
          <Link href="/">
            <img
              alt="Globe"
              src="/icons/Globe.svg"
              className="mr-[12px] h-[21px] w-[21px] cursor-pointer"
            />
          </Link>
        )}
        {currentRoute === "/playing" ? (
          <img
            alt="Playing"
            src="/icons/PlayingBlue.svg"
            className="mr-[12px] h-[21px] w-[21px] cursor-pointer"
          />
        ) : (
          <Link href={`/playing`}>
            <img
              alt="Playing"
              src="/icons/Playing.svg"
              className="mr-[12px] h-[21px] w-[21px] cursor-pointer"
            />
          </Link>
        )}
        {currentRoute === "/playlists" ? (
          <img
            alt="Playlists"
            src="/icons/PlaylistsBlue.svg"
            className="h-[21px] w-[21px] cursor-pointer"
          />
        ) : (
          <Link href={`/playlists`}>
            <img
              alt="Playlists"
              src="/icons/Playlists.svg"
              className="h-[21px] w-[21px] cursor-pointer"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
