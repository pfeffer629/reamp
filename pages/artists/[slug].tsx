import Tracklist from "../../components/Tracklist";
import { useRouter } from "next/router";
import { useArtistQuery } from "@spinamp/spinamp-hooks";

export default function Artists() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, isError } = useArtistQuery(
    slug ? slug.toString() : ""
  );

  if (isLoading || isError) {
    return <div></div>;
  }

  return (
    <div>
      <div className="flex">
        <div className="inline-block mr-[32px]">
          <div className="relative inline">
            <img
              src={
                data.artist
                  ? Object.values(data.artist.profiles)[0].avatarUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
                  : ""
              }
              alt="playlist"
              className="w-[120px] h-[120px] rounded-[100px]"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="pt-2">
            <div className="text-whiteDisabled text-[11px]">ARTIST</div>
          </div>
          <div className="text-white text-[30px]">{data.artist?.name}</div>
        </div>
      </div>
      <div className="relative mt-6 text-sm">
        <div className="flex items-center space-x-14 z-10">
          <div className="text-selectedTab cursor-pointer relative z-10 pb-2">
            ❏ Released Tracks
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-[2px] bg-whiteDisabled z-0"></div>
        <div className="left-0 cursor-pointer bottom-0 w-10 h-[2px] bg-white z-10 opacity-100 transform transition-all duration-500 absolute w-[124px]"></div>
      </div>
      <Tracklist tracks={data.tracks} />
    </div>
  );
}