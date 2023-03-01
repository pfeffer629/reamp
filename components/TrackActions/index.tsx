import { useState, useContext } from "react";
import Link from "next/link";
import CopiedToClipboard from "../../components/CopiedToClipboard";
import TrackActionContext from "../../contexts/TrackActionContext";
import PlaylistContext from "../../contexts/PlaylistContext";
import { useAccount } from "wagmi";

function TrackActions() {
  const [copyToClipbard, setCopyToClipbard] = useState(false);

  const { selectedTrack, setSelectedTrack } = useContext(TrackActionContext);
  const { toggleModal } = useContext(PlaylistContext);
  const { address } = useAccount();

  const shareTrack = () => {
    setSelectedTrack({});
    setCopyToClipbard(true);
    navigator.clipboard.writeText(
      `https://beta.reamp.xyz/tracks/${selectedTrack.slug}`
    );
    setTimeout(() => {
      setCopyToClipbard(false);
    }, 4000);
  };

  const addToPlaylist = () => {
    if (address) {
      setSelectedTrack({});
      toggleModal(selectedTrack);
    }
  };

  return (
    <div
      className={`${
        Object.keys(selectedTrack).length > 0 ? "block" : "hidden"
      } h-[100vh]`}
    >
      <div
        className="h-[100vh] w-[100vw] absolute top-0 z-9"
        onClick={() => setSelectedTrack({})}
      ></div>
      <div className="w-full border-[2px] border-[#272727] rounded-t-[30px] bg-sidebarBg/[0.8] backdrop-blur-sm fixed bottom-0 mb-[64px] z-10 flex flex-col justify-center align-center">
        {copyToClipbard && <CopiedToClipboard />}
        <Link
          href={`/tracks/${selectedTrack.slug}`}
          onClick={() => setSelectedTrack({})}
          className="mb-[48px] mt-[80px] flex justify-center items-center"
        >
          <img
            alt="Globe"
            src="/icons/Globe.svg"
            className="h-[21px] w-[21px] mr-[16px]"
          />
          <span>Track Details</span>
        </Link>
        <div
          className="mb-[48px] flex justify-center items-center cursor-pointer"
          onClick={() => addToPlaylist()}
        >
          <img
            alt="Playlists"
            src="/icons/Playlists.svg"
            className="h-[21px] w-[21px] mr-[16px]"
          />
          <span>Add to Playlist</span>
        </div>
        <div
          className="mb-[80px] flex justify-center items-center cursor-pointer"
          onClick={() => shareTrack()}
        >
          <img
            alt="Small Share"
            src="/icons/SmallShare.svg"
            className="h-[21px] w-[21px] mr-[16px]"
          />
          <span>Share Track</span>
        </div>
      </div>
    </div>
  );
}

export default TrackActions;
