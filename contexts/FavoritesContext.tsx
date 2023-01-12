import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useAccount } from "wagmi";
import { ITrack, fetchTracksByIds } from "@spinamp/spinamp-sdk";
import { useRouter } from "next/router";

interface IFavoritesContextData {
  favorites: string[];
  favoriteTracks: ITrack[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  addFavorite: any;
  removeFavorite: any;
}

export const FavoritesContext = createContext<IFavoritesContextData>(
  {} as IFavoritesContextData
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteTracks, setFavoriteTracks] = useState<ITrack[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { address } = useAccount();

  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (address && (currentRoute === "/favorites" || currentRoute === "/")) {
      getFavorites(address);
    }
  }, [address, currentRoute]);

  useEffect(() => {
    if (!address) {
      setFavorites([]);
      setFavoriteTracks([]);
    }
  }, [address, currentRoute]);

  async function addFavorite(trackId: string) {
    if (!address) {
      return;
    }
    const updatedFavorites = [...favorites, trackId];
    try {
      const { error } = await supabase
        .from("favorites")
        .upsert(
          { user_id: address, tracks: updatedFavorites },
          { onConflict: "user_id" }
        );
      if (error) {
        throw error;
      }
    } finally {
      setFavorites(updatedFavorites);
    }
  }

  async function removeFavorite(trackId: string) {
    if (!address) {
      return;
    }
    const updatedFavorites = favorites.filter((track) => track !== trackId);
    try {
      const { error } = await supabase
        .from("favorites")
        .update({ tracks: updatedFavorites })
        .eq("user_id", address);
      if (error) {
        throw error;
      }
    } finally {
      setFavorites(updatedFavorites);
    }
  }

  async function getFavorites(address: string) {
    if (address) {
      try {
        const { data: favorites, error } = await supabase
          .from("favorites")
          .select("tracks")
          .eq("user_id", address)
          .single();

        fetchTracksByIds(favorites?.tracks).then((tracks) => {
          setFavoriteTracks(tracks.reverse());
        });
        if (error) {
          throw error;
        } else {
          setFavorites(favorites.tracks);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }

  return (
    <FavoritesContext.Provider
      value={
        {
          favorites,
          setFavorites,
          addFavorite,
          removeFavorite,
          favoriteTracks,
        } as IFavoritesContextData
      }
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
