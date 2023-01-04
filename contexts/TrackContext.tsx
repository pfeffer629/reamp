import React, { createContext, useState, useEffect } from "react";
import { ITrack, fetchTracksByIds } from "@spinamp/spinamp-sdk";
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
  const [shuffle, setShuffle] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState<ITrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracklist, setTracklist] = useState([]);
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);

  const randomizeArray = (tracks) => {
    const shuffledTracks = tracks;
    for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tracks[i];
      tracks[i] = tracks[j];
      tracks[j] = temp;
    }
    return shuffledTracks;
  }

  const shuffleTracks = () => {
    const shuffledTracks = randomizeArray([...tracks])
    setShuffle(true)
    setTracklist(shuffledTracks)
    setCurrentTrackIndex(shuffledTracks.indexOf(currentTrack as ITrack))
  }

  const unshuffleTracks = () => {
    setShuffle(false)
    setCurrentTrackIndex(tracks.indexOf(currentTrack as ITrack))
  }

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
        } as ITrackContextData
      }
    >
      {children}
    </TrackContext.Provider>
  );
}

export default TrackContext;
