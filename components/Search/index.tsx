import { useState, useEffect, useContext } from "react";
import {
  fetchAllTracks,
  fetchAllArtists,
  ITrack,
  IArtist,
} from "@spinamp/spinamp-sdk";
import Image from "next/image";
import { useAccount } from "wagmi";
import PlayingIcon from "../Icons/PlayingIcon";
import TrackContext from "../../contexts/TrackContext";
import svgAvatar from "../../utils/svgAvatar";
import Link from "next/link";

function Search() {
  const [searchParams, setSearchParams] = useState("");
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [showResults, toggleResults] = useState(true);
  const { address } = useAccount();
  const {
    isPlaying,
    currentTrack,
    setCurrentTrack,
    setCurrentTrackIndex,
    setIsPlaying,
    setTracklist,
  } = useContext(TrackContext);

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setTracklist(tracks);
    setCurrentTrackIndex(tracks.indexOf(track));
  };

  useEffect(() => {
    if (searchParams.length > 2) {
      fetchAllTracks({
        filter: { title: { includesInsensitive: searchParams } },
      }).then((tracks) => {
        setTracks(tracks.items);
      });
      fetchAllArtists({
        filter: { name: { includesInsensitive: searchParams } },
      }).then((artists) => {
        setArtists(artists.items);
      });
    } else {
      setTracks([]);
      setArtists([]);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      <div className="relative text-searchBarText">
        <input
          type="text"
          className="z-10 px-[14px] pl-[34px] rounded-lg w-[380px] h-[41px] pt-[4px] flex items-center bg-blackSecondary relative outline-none ring-0 text-[12px]"
          placeholder="Search web3 music and artists"
          onChange={(e) => setSearchParams(e.target.value)}
          onFocus={() => toggleResults(true)}
        />
        <div className="z-10 absolute pl-[14px] text-[aqua] top-0 pt-[4px] flex items-center justify-center h-[41px]">
          •
        </div>
      </div>
      {showResults && (tracks.length > 0 || artists.length > 0) && (
        <>
          <div
            className="fixed inset-0 bg-black/[0.6] transition-opacity"
            onClick={() => toggleResults(false)}
          ></div>
          <div className="max-h-[525px] overflow-scroll absolute bg-sidebarBg rounded-lg mt-[57px] z-20 p-[22px] color-white flex">
            {tracks.length > 0 && (
              <div className="flex flex-col">
                <span className="text-[#767676]">Tracks</span>
                <div className="my-[8px] border-b border-darkLine h-1 w-[352px]"></div>
                {tracks.map((track) => (
                  <Link
                    className="p-[9px] flex hover:bg-sidebarMenuHoverBg rounded-lg transition-all"
                    key={track.id}
                    onClick={() => toggleResults(false)}
                    href={`/tracks/${track.slug}`}
                  >
                    {currentTrack.id === track.id && isPlaying ? (
                      <div className="flex justify-center items-center w-[38px] h-[38px]">
                        <PlayingIcon />
                      </div>
                    ) : (
                      <div className="cursor-pointer hover:scale-125 flex justify-center items-center transition-all duration-300 transform rounded-full w-[38px] h-[38px] pt-3 pr-1">
                        <img
                          loading="lazy"
                          alt="Play Button"
                          src="/icons/Play_Controls.svg"
                          className="w-[14px] translate-x-[1px]"
                          onClick={() => handleSelectTrack(track)}
                        />
                      </div>
                    )}
                    <div className="w-[52px] aspect-square overflow-hidden h-full flex items-center">
                      <Image
                        alt={track.title}
                        height={52}
                        width={52}
                        src={track.lossyArtworkUrl || ""}
                        className="rounded-[5px]"
                      />
                    </div>
                    <div className="flex items-center max-sm:w-2/5 w-[190px] ">
                      <div className="flex flex-col justify-center w-full ml-2 ">
                        <div className="truncate w-full">{track.title}</div>
                        <div className="text-whiteDisabled truncate w-full">
                          {address ? (
                            <Link
                              href={`/artists/${track.artist?.slug}`}
                              className="hover:underline"
                            >
                              {track.artist.name}
                            </Link>
                          ) : (
                            <span>{track.artist.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {artists.length > 0 && (
              <div
                className={`flex flex-col ${
                  tracks.length > 0 ? "ml-[35px]" : ""
                }`}
              >
                <span className="text-[#767676]">Artists</span>
                <div className="my-[8px] border-b border-darkLine h-1 w-[352px]"></div>
                {artists.map((artist) => (
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="p-[9px] flex hover:bg-sidebarMenuHoverBg items-center rounded-lg transition-all"
                    key={artist.id}
                    onClick={() => toggleResults(false)}
                  >
                    {artist &&
                    Object.keys(artist.profiles).length > 0 &&
                    Object.values(artist.profiles)[0].avatarUrl ? (
                      <Image
                        src={
                          Object.values(artist.profiles)[0].avatarUrl?.replace(
                            "ipfs://",
                            "https://ipfs.io/ipfs/"
                          ) as string
                        }
                        alt="artist avatar"
                        className="rounded-full object-cover w-[52px] h-[52px]"
                        height={52}
                        width={52}
                      />
                    ) : (
                      <Image
                        src={svgAvatar}
                        alt="artist avatar"
                        className="rounded-full object-cover w-[52px] h-[52px]"
                        height={52}
                        width={52}
                      />
                    )}
                    <div className="flex ml-[14px] ">{artist.name}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
