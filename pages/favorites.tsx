import { useContext } from "react";
import Tracklist from "../components/Tracklist";
import FavoritesContext from "../contexts/FavoritesContext";
import Onboarding from "../components/Onboarding";

export default function Favorites() {
  const { favoriteTracks } = useContext(FavoritesContext);
  const smallHeartFilled = <img
    src="/icons/SmallHeartFilled.svg"
    alt="Heart Filled"
    className="w-[32px]"
  />

  return (
    favoriteTracks.length ? <Tracklist tracks={favoriteTracks} />
    : <Onboarding icon={smallHeartFilled} text={"Looks like you haven't favorited any tracks yet"} cta={"Explore Tracks"} ctaLink="/"/>);
}
