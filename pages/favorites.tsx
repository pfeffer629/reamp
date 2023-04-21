import { useContext } from "react";
import Tracklist from "../components/Tracklist";
import FavoritesContext from "../contexts/FavoritesContext";
import Onboarding from "../components/Onboarding";

export default function Favorites() {
  const { favoriteTracks } = useContext(FavoritesContext);

  return (
    favoriteTracks.length ? <Tracklist tracks={favoriteTracks} />
    : <Onboarding icon={"favorite-icon"} text={"Looks like you haven't favorited any tracks yet"}/>);
}
