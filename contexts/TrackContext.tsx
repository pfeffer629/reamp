import React, { createContext, useState, useEffect } from "react";
import { ITrack } from "@spinamp/spinamp-sdk";
import { usePaginatedTracksQuery } from "@spinamp/spinamp-hooks";
import shuffleArray from "../utils/shuffleArray";

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
  tracklist: ITrack[];
  setTracklist: React.Dispatch<React.SetStateAction<ITrack[]>>;
  shuffledTracklist: ITrack[];
  setShuffledTracklist: React.Dispatch<React.SetStateAction<ITrack[]>>;
}

export const TrackContext = createContext<ITrackContextData>(
  {} as ITrackContextData
);

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState({});
  const [shuffle, setShuffle] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracklist, setTracklist] = useState<ITrack[]>([]);
  const [shuffledTracklist, setShuffledTracklist] = useState<ITrack[]>([]);
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);

  const shuffleTracks = () => {
    const shuffledTracks = shuffleArray([...tracklist]);
    setShuffle(true);
    setShuffledTracklist(shuffledTracks);
    setCurrentTrackIndex(shuffledTracks.indexOf(currentTrack as ITrack));
  };

  const unshuffleTracks = () => {
    setShuffle(false);
    setShuffledTracklist([]);
    setCurrentTrackIndex(tracklist.indexOf(currentTrack as ITrack));
  };

  useEffect(() => {
    if (!isLoading && Object.keys(currentTrack).length === 0) {
      setCurrentTrack(tracks[0]);
      setTracklist(tracks);
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
          tracklist,
          setTracklist,
          shuffledTracklist,
          setShuffledTracklist,
        } as ITrackContextData
      }
    >
      {children}
    </TrackContext.Provider>
  );
}

export default TrackContext;
