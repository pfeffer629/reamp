import { useContext } from "react";
import { useRouter } from "next/router";
import { useTrackQuery } from "@spinamp/spinamp-hooks";
import PlayButton from "../../components/Icons/PlayButton";
import TrackContext from "../../contexts/TrackContext";
import svgAvatar from "../../utils/svgAvatar";
import { ITrack } from "@spinamp/spinamp-sdk";
import FavoritesContext from "../../contexts/FavoritesContext";
import { useAccount } from "wagmi";

export default function Track() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useTrackQuery(slug ? slug.toString() : "");
  const { setCurrentTrack, setIsPlaying } = useContext(TrackContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const { address } = useAccount();

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  if (isLoading || error) {
    return <div></div>;
  }
  console.log(data)

  return (
    <div className="w-[895px] mx-auto">
      <div className="py-8 border-t-[0.5px] border-white/30 mt-8">
        <div className="text-l text-whiteDisabled">
          <span>{data?.artist.name}</span>
        </div>
        <div className="text-4xl font-bold">
          <span>{data?.title}</span>
          {favorites.includes(data.id) ? (
            <img
              src="/icons/SmallHeartFilled.svg"
              alt="Heart Filled"
              className="inline-block cursor-pointer ml-[15px]"
              onClick={() => removeFavorite(data.id)}
            />
          ) : (
            <img
              src="/icons/SmallHeart.svg"
              alt="Heart Empty"
              className={`${!address && "cursor-default"} inline-block cursor-pointer ml-[15px]`}
              onClick={() => addFavorite(data.id)}
            />
          )}
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div
          className="w-[40%] h-[40%] rounded-lg overflow-hidden shadow-md shadow-white/20 transform transition-all duration-[3s] active:rotate-[1800deg] active:scale-75"
          draggable="false"
        >
          <img
            className="w-full"
            draggable="false"
            src={data?.lossyArtworkUrl}
          />
          <PlayButton
            className="cursor-pointer absolute top-0 bottom-0 left-0 right-0 m-auto"
            height={100}
            width={80}
            onClick={() => handleSelectTrack(data as ITrack)}
          />
        </div>
        <div className="w-[56%]">
          <div className="text-whiteDisabled">{data?.description}</div>
          <div>
            Creator:
            <div className="flex flex-row items-center space-x-[9px]">
              <img
                src={
                  data?.artist
                    ? Object.values(data.artist.profiles)[0].avatarUrl?.replace(
                        "ipfs://",
                        "https://ipfs.io/ipfs/"
                      )
                    : svgAvatar
                }
                className="w-[21px] aspect-square rounded-[10px]"
              />
              &nbsp;{data?.artist.name}
            </div>
            <div>
              <div className="shadow-md py-1">
                <a
                  target="_blank"
                  className="py-1 hover:text-green-300 active:text-green-500 flex items-center space-x-2"
                  href={data?.websiteUrl}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                    <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
