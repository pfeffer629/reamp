import { useContext } from "react";
import Tracklist from "../components/Tracklist";
import FavoritesContext from "../contexts/FavoritesContext";

export default function Favorites() {
  const { favoriteTracks } = useContext(FavoritesContext);

  return (
    <Tracklist tracks={favoriteTracks} />
  );
}
