import { useContext } from "react";
import Image from "next/image";
import { ITrack } from "@spinamp/spinamp-sdk";
import TrackContext from "../contexts/TrackContext";
import FavoritesContext from "../contexts/FavoritesContext";
import Link from "next/link";
import shuffleArray from "../utils/shuffleArray";
import Tracklist from "../components/Tracklist";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function Favorites() {
  const timeAgo = new TimeAgo("en-US");
  const {
    currentTrack,
    setCurrentTrack,
    setCurrentTrackIndex,
    isPlaying,
    setIsPlaying,
    setTracklist,
    shuffle,
    setShuffledTracklist,
  } = useContext(TrackContext);
  const { favorites, favoriteTracks, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const handleSelectTrack = (track: ITrack) => {
    if (shuffle) {
      const shuffledTracks = shuffleArray(favoriteTracks);
      setCurrentTrackIndex(shuffledTracks.indexOf(track));
      setShuffledTracklist(shuffledTracks);
    } else {
      setCurrentTrackIndex(favoriteTracks.indexOf(track));
    }
    setTracklist(favoriteTracks);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <Tracklist tracks={favoriteTracks} />
  );
}
