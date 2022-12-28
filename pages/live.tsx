import { useFeaturedPlaylistsQuery } from "@spinamp/spinamp-hooks";

export default function Live() {
  const { playlists, isLoading, isError } = useFeaturedPlaylistsQuery();

  if (isLoading || isError) {
    return <div></div>;
  }

  return (
    <div>
      <div className="py-4 flex flex-col space-y-4">
        <div className="flex items-center space-x-2 py-1">
          <div>Ecosystem Highlights</div>
          <div className="p-2 mb-1 text-sm cursor-pointer transition-all hover:bg-gray-700/40 bg-transparent rounded-md">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm64 226H200v-32h44v-88h-32v-32h64v120h44z"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap space-x-2 py-1">
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">760</div>
            <div className="text-searchBarText">Artists</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">10,336</div>
            <div className="text-searchBarText">Collectors</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">47,178</div>
            <div className="text-searchBarText">Tracks</div>
          </div>
          <div className="rounded-[7px] items-center space-x-[11px] text-[14px] p-2 px-[19px] bg-darkLine inline-flex">
            <div className="">$12,486,282</div>
            <div className="text-searchBarText">Total Volume (USD)</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 py-1 mt-6">
          <div>Recent Playlists</div>
          <div className="p-2 mb-1 text-sm cursor-pointer transition-all hover:bg-gray-700/40 bg-transparent rounded-md">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm64 226H200v-32h44v-88h-32v-32h64v120h44z"></path>
            </svg>
          </div>
        </div>
        <div className="py-4 flex flex-wrap space-x-2">
          {playlists &&
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="px-[8px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[219px]"
              >
                <img
                  src="/playlists/cover1.png"
                  alt="playlist"
                  className="w-[204px] h-[210px] rounded-[10px]"
                />
                <div className="pt-2">
                  <div className="text-whiteDisabled text-[11px]">
                    PLAYLIST • {playlist.trackIds.length} TRACKS
                  </div>
                </div>
                <div className="text-white text-[18px]">{playlist.title}</div>
                <div className="flex items-center space-x-[9px]">
                  <div>
                    <img
                      src="/users/user1.png"
                      alt="user"
                      className="w-[21px] aspect-square"
                    />
                  </div>
                  <div className="text-[15px]"></div>
                </div>
                <div className="pt-2">
                  <div className="text-whiteDisabled text-[15px]">
                    1 minute ago
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
