import { useEffect, useContext, useState } from "react";
import Image from "next/image";
import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";
import { ITrack, fetchTracksByIds } from "@spinamp/spinamp-sdk";
import TrackContext from "../contexts/TrackContext";
import Link from "next/link";
import { supabase } from "../utils/supabase";
import { useAccount } from "wagmi";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Favorites() {
  const [tracks, setTracks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const timeAgo = new TimeAgo("en-US");
  const { setCurrentTrack, setCurrentTrackIndex, setIsPlaying } =
    useContext(TrackContext);
  const { address } = useAccount();

  useEffect(() => {
    getFavorites(address);
  }, [address]);

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(tracks.indexOf(track));
    setIsPlaying(true);
  };

  async function addFavorite(trackId: string) {
    const updatedFavorites = [...favorites, trackId];
    try {
      const { error } = await supabase
        .from("favorites")
        .update({ tracks: updatedFavorites })
        .eq("user_id", address);

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.log("Error loading user favorites!");
    } finally {
      setFavorites(updatedFavorites);
    }
  }

  async function removeFavorite(trackId: string) {
    const updatedFavorites = favorites.filter((track) => track !== trackId);
    try {
      const { error } = await supabase
        .from("favorites")
        .update({ tracks: updatedFavorites })
        .eq("user_id", address);

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.log("Error loading user favorites!");
    } finally {
      setFavorites(updatedFavorites);
    }
  }

  async function getFavorites(address) {
    try {
      const {
        data: favorites,
        error,
        status,
      } = await supabase
        .from("favorites")
        .select("tracks")
        .eq("user_id", address)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      fetchTracksByIds(favorites.tracks).then((tracks) => {
        setTracks(tracks);
      });
      setFavorites(favorites.tracks);
    } catch (error) {
      console.log("Error loading user favorites!");
    }
  }

  return (
    <div className="w-[895px] mx-auto">
      <div className="py-4 flex flex-col space-y-4 min-h-[calc(100vh-160px)]">
        <div className="w-full">
          <div className="flex items-center">
            <div className="w-[46px]"></div>
            <div className="p-[9px]">
              <div className="w-[52px]">Cover</div>
            </div>
            <div className="w-[191px]">Track</div>
            <div className="w-[130px] text-center">Released</div>
            <div className="w-[130px] text-center">Collectors</div>
            <div className="w-[70px] text-center">Value</div>
            <div className="w-[60px]"></div>
            <div className="w-[130px] text-center">Collect</div>
          </div>
          {tracks &&
            tracks.map((track) => (
              <div className="flex flex-col space-y-4" key={track.id}>
                <div className="flex w-full item-center bg-black group hover:bg-blackSecondary transition-all rounded-lg">
                  <div className="w-[46px]">
                    <div className="flex items-center h-full justify-center">
                      <div className="cursor-pointer hover:bg-gray-800/80 flex justify-center items-center transition-all duration-300 transform rounded-full w-[38px] h-[38px]">
                        <img
                          loading="lazy"
                          alt="Play Button"
                          src="/icons/PlayButton.png"
                          className="w-[14px] translate-x-[1px]"
                          onClick={() => handleSelectTrack(track)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-[9px]">
                    <div className="w-[52px] aspect-square overflow-hidden h-full flex items-center">
                      <Image
                        alt={track.title}
                        height={52}
                        width={52}
                        src={track.lossyArtworkUrl || ""}
                        className="rounded-[5px]"
                      />
                    </div>
                  </div>
                  <Link
                    className="flex items-center w-[191px]"
                    href={`/track/${track.slug}`}
                  >
                    <div className="flex flex-col justify-center w-full pr-2">
                      <div className="truncate w-full">{track.title}</div>
                      <div className="text-whiteDisabled truncate w-full">
                        {track.artist.name}
                      </div>
                    </div>
                  </Link>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    {timeAgo.format(new Date(track.createdAtTime || 0))}
                  </div>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    0
                  </div>
                  <div className="w-[70px] flex items-center justify-center h-[70px]">
                    <div className="flex items-center space-x-1">
                      <div className="font-sans pb-[2px]">Ξ</div>
                      <div>0</div>
                    </div>
                  </div>
                  <div className="w-[60px] flex items-center justify-center h-[70px]">
                    <div className="cursor-pointer hover:scale-125 transition-all p-2 hover:bg-slate-800/40 rounded-md select-none">
                      {favorites.includes(track.id) ? (
                        <img
                          src="/icons/HeartFilled.png"
                          alt="Heart Filled"
                          className="w-[14px]"
                          onClick={() => removeFavorite(track.id)}
                        />
                      ) : (
                        <img
                          src="/icons/HeartEmpty.png"
                          alt="Heart Empty"
                          className="w-[14px]"
                          onClick={() => addFavorite(track.id)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-[130px] flex items-center justify-center h-[70px]">
                    <div className="cursor-pointer bg-white group-hover:bg-selectedTab w-[67px] h-[20px] uppercase flex justify-center items-center text-[10px] rounded-[3px] text-black transition-all duration-500 pt-[2px] select-none">
                      collect
                    </div>
                  </div>
                  <div className="w-[60px] flex items-center justify-center h-[70px]">
                    <div className="bg-transparent hover:bg-gray-500/30 p-2 transition-all transform rounded-lg cursor-pointer duration-300">
                      <img
                        src="/icons/ThreeDots.png"
                        alt="Three Dots"
                        className="w-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
