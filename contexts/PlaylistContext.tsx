import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useAccount } from "wagmi";
import { ITrack, fetchTracksByIds } from "@spinamp/spinamp-sdk";
import { useRouter } from "next/router";

interface IPlaylistContextData {
}

export const PlaylistContext = createContext<IPlaylistContextData>(
  {} as IPlaylistContextData
);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [trackToAdd, setTrackToAdd] = useState({});
  const [userPlaylists, setUserPlaylists] = useState({});
  const { address } = useAccount();
  const router = useRouter();
  const currentRoute = router.pathname;

	useEffect(() => {
    if (address && (currentRoute === "/playlists" || currentRoute === "/")) {
      getPlaylists(address);
    }
  }, [address, currentRoute]);

  const toggleModal = (currentTrack=null) => {
  	setShowModal(!showModal)
  	if (currentTrack) {
  		setTrackToAdd(currentTrack)
  	}
  }

  async function getPlaylists(address: string) {
    if (address) {
      try {
        const { data: playlists, error } = await supabase
          .from("playlists")
          .select("*")
          .eq("user_id", address)

        setUserPlaylists(playlists);
      } catch (error) {
        throw(error);
      }
    } else {
      return;
    }
  }

  async function createPlaylist(name) {
  	if (!address) { return }
    try {
      const { error } = await supabase
        .from("playlists")
        .insert({ user_id: address,  name: name, tracks: [trackToAdd.id], cover: trackToAdd.lossyArtworkUrl })
    } catch (error) {
      throw(error);
    }
  }

  return (
    <PlaylistContext.Provider
      value={
        {
        	showModal,
          toggleModal,
          createPlaylist,
          userPlaylists,
        } as IPlaylistContextData
      }
    >
    	{children}
	  </PlaylistContext.Provider>
  )
}

export default PlaylistContext;
