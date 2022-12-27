import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[230px] bg-sidebarBg border-r border-darkLine relative">
      <div className="fixed bg-sidebarBg border-r border-darkLine">
        <div className="p-[27px] h-[calc(100vh-30px)] flex flex-col w-[230px]">
          <div className="">
            <Link className="relative group transition-all" href="/" as="/">
              <div className="pb-[4px] h-8">
                <img
                  src="/images/reamp-logo-white.png"
                  alt="reamp logo"
                  className="w-[115px] group-hover:opacity-0 transition-all"
                />
                <img
                  src="/images/reamp-logo-blue.png"
                  alt="reamp logo"
                  className="w-[115px] absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all"
                />
              </div>
            </Link>
            <div className="text-[13px] pt-2 text-whiteDisabled h-14">
              7:32 PM • White Plains, United States
              <br />
              Sun, December 25, 2022
            </div>
          </div>
          <div className="my-[22px] border-b border-darkLine w-full h-1"></div>
          <div className="flex items-center w-full space-x-[11px] text-whiteDisabled pb-[8px]">
            <div className="h-[13px] mb-[2px] w-[2px] rounded-md bg-whiteDisabled"></div>
            <div>Discover</div>
          </div>
          <div className="flex flex-col space-y-[3px]">
            <Link href="/" as="/" className="w-[177px] h-[31px] rounded-md bg-transparent hover:bg-sidebarMenuHoverBg cursor-pointer flex items-center text-[12px] relative group transition-all duration-500">
              <div
                className="rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500 bg-selectedTab absolute"
                style={{"inset": "41.94% 89.88% 41.94% 7.14%"}}
              ></div>
              <div className="ml-[14px] transform transition-all group-hover:ml-[24px] select-none duration-300 py-[8px]">
                Freshly Minted
              </div>
            </Link>
            <Link href="/live" as="/live" className="w-[177px] h-[31px] rounded-md bg-transparent hover:bg-sidebarMenuHoverBg cursor-pointer flex items-center text-[12px] relative group transition-all duration-500">
              <div
                className="rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500 bg-selectedTab absolute"
                style={{"inset": "41.94% 89.88% 41.94% 7.14%"}}
              ></div>
              <div className="ml-[14px] transform transition-all group-hover:ml-[24px] select-none duration-300 py-[8px]">
                Live Activity
              </div>
            </Link>
          </div>
          <div className="flex items-center w-full mt-[30px] space-x-[11px] text-whiteDisabled pb-[8px]">
            <div className="h-[13px] mb-[2px] w-[2px] rounded-md bg-whiteDisabled"></div>
            <div>My Profile</div>
          </div>
          <div className="flex flex-col space-y-[3px]">
            <div className="w-[177px] h-[31px] rounded-md bg-transparent hover:bg-sidebarMenuHoverBg cursor-pointer flex items-center text-[12px] relative group transition-all duration-500">
              <div
                className="rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500 bg-selectedTab absolute"
                style={{"inset": "41.94% 89.88% 41.94% 7.14%"}}
              ></div>
              <div className="ml-[14px] transform transition-all group-hover:ml-[24px] select-none duration-300 py-[8px]">
                Favorites
              </div>
            </div>
            <div className="w-[177px] h-[31px] rounded-md bg-transparent hover:bg-sidebarMenuHoverBg cursor-pointer flex items-center text-[12px] relative group transition-all duration-500">
              <div
                className="rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500 bg-selectedTab absolute"
                style={{"inset": "41.94% 89.88% 41.94% 7.14%"}}
              ></div>
              <div className="ml-[14px] transform transition-all group-hover:ml-[24px] select-none duration-300 py-[8px]">
                Playlists
              </div>
            </div>
            <div className="w-[177px] h-[31px] rounded-md bg-transparent hover:bg-sidebarMenuHoverBg cursor-pointer flex items-center text-[12px] relative group transition-all duration-500">
              <div
                className="rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500 bg-selectedTab absolute"
                style={{"inset": "41.94% 89.88% 41.94% 7.14%"}}
              ></div>
              <div className="ml-[14px] transform transition-all group-hover:ml-[24px] select-none duration-300 py-[8px]">
                My Collection
              </div>
            </div>
          </div>
          <div className="pt-[36px]">
            <div className="w-[177px] h-[31px] rounded-md bg-transparent hover:bg-sidebarMenuHoverBg cursor-pointer flex items-center text-[12px] relative group transition-all duration-500">
              <div
                className="rounded-full group-hover:opacity-100 opacity-0 transition-all duration-500 bg-selectedTab absolute"
                style={{"inset": "41.94% 89.88% 41.94% 7.14%"}}
              ></div>
              <div className="ml-[14px] transform transition-all group-hover:ml-[24px] select-none duration-300 py-[8px]">
                Submit Feedback
              </div>
            </div>
            <div className="w-[177px] h-[31px] rounded-md space-x-4 flex items-center text-[12px] relative group transition-all duration-500 pl-[14px]">
              <a target="_blank" href="https://twitter.com/reamp__">
                <div className="cursor-pointer hover:text-selectedTab transition-all duration-300">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                  </svg>
                </div>
              </a>
              <a target="_blank" href="https://www.instagram.com/reamp.xyz/">
                <div className="cursor-pointer hover:text-selectedTab transition-all duration-300">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fillRule="nonzero"
                        d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                      ></path>
                    </g>
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
