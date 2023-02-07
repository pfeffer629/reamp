import { useRouter } from "next/router";
import Link from "next/link";

export default function MobileTabFooter() {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="relative flex justify-center mt-6 py-6 text-sm">
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
            currentRoute === "/live" ? "text-selectedTab" : "text-whiteDisabled"
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
  );
}
