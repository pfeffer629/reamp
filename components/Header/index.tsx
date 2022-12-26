export default function Header() {
  return (
    <div className="w-[895px] mx-auto py-4">
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
          <div className="flex items-center justify-end px-4 text-gray-400">
            <div className="flex items-center text-lg cursor-pointer p-1.5 px-6 rounded-lg shadow bg-transparent hover:bg-brown-100 dark:hover:bg-brown-900 text-bgDark dark:text-bg active:bg-brown-300 dark:active:bg-brown-800 transition-all duration-300 select-none">
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
                  <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
                </g>
              </svg>
              <div className="text-sm tracking-wide ml-3">Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
