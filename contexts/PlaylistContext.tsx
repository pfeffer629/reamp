import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useAccount } from "wagmi";
import { ITrack } from "@spinamp/spinamp-sdk";
import { useRouter } from "next/router";

interface IPlaylistContextData {
  userPlaylists: any[];
  toggleModal: any,
  showModal: boolean,
  createPlaylist: any,
  addToPlaylist: any,
}

export const PlaylistContext = createContext<IPlaylistContextData>(
  {} as IPlaylistContextData
);

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const [trackToAdd, setTrackToAdd] = useState({} as ITrack);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [recentPlaylists, setRecentPlaylists] = useState([]);
  const { address } = useAccount();
  const router = useRouter();
  const currentRoute = router.pathname;

	useEffect(() => {
    if (address && (currentRoute === "/playlists" || currentRoute === "/")) {
      getPlaylists(address);
    }
  }, [address, currentRoute]);
 
  useEffect(() => {
    if (currentRoute === "/live") {
      getRecentPlaylists();
    }
  }, [currentRoute]);

  const toggleModal = (currentTrack=null) => {
  	setShowModal(!showModal)
  	if (currentTrack) {
  		setTrackToAdd(currentTrack)
  	}
  }

  async function getRecentPlaylists() {
    try {
      const { data: playlists, error } = await supabase
        .from("playlists")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(40)

      setRecentPlaylists(playlists as []);
    } catch (error) {
      throw(error);
    }
  }

  async function getPlaylists(address: string) {
    if (address) {
      try {
        const { data: playlists, error } = await supabase
          .from("playlists")
          .select("*")
          .eq("user_id", address)

        setUserPlaylists(playlists as []);
      } catch (error) {
        throw(error);
      }
    } else {
      return;
    }
  }

  async function createPlaylist(name: string) {
  	if (!address || !name) { return }
    try {
      const { error } = await supabase
        .from("playlists")
        .insert({ user_id: address,  name: name, tracks: [trackToAdd.id], cover: trackToAdd.lossyArtworkUrl })
    } catch (error) {
      throw(error);
    } finally {
      setShowModal(false  )
    }
  }
 
  async function addToPlaylist(playlistId: string) {
    const trackId = trackToAdd.id
    if (!address) { return }
    try {
      let response = await supabase
        .rpc('add_track_to_playlist', {
          track_id: trackId,
          id: playlistId, 
        })
    } catch (error) {
      throw(error);
    } finally {  
      setShowModal(false)
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
          recentPlaylists,
          addToPlaylist,
        } as IPlaylistContextData
      }
    >
    	{children}
	  </PlaylistContext.Provider>
  )
}

export default PlaylistContext;
