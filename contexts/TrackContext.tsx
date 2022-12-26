import React, {createContext, useState} from "react";
import { ITrack } from "@spinamp/spinamp-sdk";
import Player from "../components/Player";

interface ITrackContextData {
  currentTrack: ITrack;
  setCurrentTrack: React.Dispatch<React.SetStateAction<object>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTrackIndex: number;
  setCurrentTrackIndex: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TrackContext = createContext<ITrackContextData>({} as ITrackContextData);

export function TrackProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState({})
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

	return (
		<TrackContext.Provider value={{currentTrack, setCurrentTrack, currentTrackIndex, setCurrentTrackIndex, isPlaying, setIsPlaying} as ITrackContextData}>
			{children}
		</TrackContext.Provider>
	);
}

export default TrackContext;
