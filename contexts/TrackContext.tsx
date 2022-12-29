import React, { createContext, useState, useEffect } from "react";
import { ITrack } from "@spinamp/spinamp-sdk";
import Player from "../components/Player";
import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";

interface ITrackContextData {
  currentTrack: ITrack;
  setCurrentTrack: React.Dispatch<React.SetStateAction<object>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;
  shuffle: boolean;
  shuffleTracks: any;
  unshuffleTracks: any;
  shuffledTracks: ITrack[];
}

export const TrackContext = createContext<ITrackContextData>(
  {} as ITrackContextData
);

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState({});
  const [shuffledTracks, setShuffledTracks] = useState<ITrack[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);

  const shuffleTracks = () => {
    const shuffledTracksArray = [...tracks];
    for (let i = shuffledTracksArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledTracksArray[i];
      shuffledTracksArray[i] = shuffledTracksArray[j];
      shuffledTracksArray[j] = temp;
    }
    setShuffle(true)
    setShuffledTracks(shuffledTracksArray)
  }

  useEffect(() => {
    console.log(currentTrack)
    if (shuffle && Object.keys(currentTrack).length === 0) {
      console.log(currentTrack)
      setCurrentTrackIndex(shuffledTracks.indexOf(currentTrack))
    }
  }, [shuffle, currentTrack]);

  const unshuffleTracks = () => {
    setShuffle(false)
    setCurrentTrackIndex(tracks.indexOf(currentTrack))
  }

  useEffect(() => {
    if (!isLoading && Object.keys(currentTrack).length === 0) {
      setCurrentTrack(tracks[0]);
    }
  }, [isLoading, tracks]);

  return (
    <TrackContext.Provider
      value={
        {
          currentTrack,
          setCurrentTrack,
          currentTrackIndex,
          setCurrentTrackIndex,
          isPlaying,
          setIsPlaying,
          shuffle,
          shuffleTracks,
          unshuffleTracks,
          shuffledTracks
        } as ITrackContextData
      }
    >
      {children}
    </TrackContext.Provider>
  );
}

export default TrackContext;
