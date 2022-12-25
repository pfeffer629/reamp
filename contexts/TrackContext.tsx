import React, {createContext, useState} from "react";
import { ITrack } from "@spinamp/spinamp-sdk";
import Player from "../components/Player";

export const TrackContext = createContext({});

export function TrackProvider({ track, children }: { track: ITrack, children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState({lossyAudioUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'})
  const [isPlaying, setIsPlaying] = useState(false)

	return (
		<TrackContext.Provider value={{currentTrack, setCurrentTrack, isPlaying, setIsPlaying}}>
			{children}
		</TrackContext.Provider>
	);
}

export default TrackContext;
