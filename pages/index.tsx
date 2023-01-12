import { useContext } from "react";
import Image from "next/image";
import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";
import { ITrack } from "@spinamp/spinamp-sdk";
import TrackContext from "../contexts/TrackContext";
import Link from "next/link";
import { useAccount } from "wagmi";
import FavoritesContext from "../contexts/FavoritesContext";
import Tracklist from "../components/Tracklist";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Home() {
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);
  const timeAgo = new TimeAgo("en-US");
  const {
    isPlaying,
    currentTrack,
    setCurrentTrack,
    setCurrentTrackIndex,
    setIsPlaying,
    setTracklist,
  } = useContext(TrackContext);
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);
  const { address } = useAccount();

  if (isLoading || isError) {
    return <div></div>;
  }

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(tracks.indexOf(track));
    setTracklist(tracks);
    setIsPlaying(true);
  };

  return (
    <Tracklist tracks={tracks} />
  );
}
