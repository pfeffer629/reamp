import React, { useState, createContext } from "react";
import { ITrack } from "@spinamp/spinamp-sdk";

interface ITrackActionContextData {
  selectedTrack: ITrack;
  setSelectedTrack: React.Dispatch<React.SetStateAction<object>>;
}

export const TrackActionContext = createContext<ITrackActionContextData>(
  {} as ITrackActionContextData
);

export function TrackActionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTrack, setSelectedTrack] = useState({});

  return (
    <TrackActionContext.Provider
      value={
        {
          selectedTrack,
          setSelectedTrack,
        } as ITrackActionContextData
      }
    >
      {children}
    </TrackActionContext.Provider>
  );
}

export default TrackActionContext;
