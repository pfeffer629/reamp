import { useState, useContext } from "react";
import Link from "next/link";
import TrackActionContext from "../../contexts/TrackActionContext";
import PlaylistContext from "../../contexts/PlaylistContext";
import { useAccount } from "wagmi";
import CopiedToClipboard from "../CopiedToClipboard";

function TrackPopUp() {
    const [copyToClipboard, setCopyToClipboard] = useState(false);
    const { selectedTrack, setSelectedTrack } = useContext(TrackActionContext);
    const { toggleModal } = useContext(PlaylistContext);
    const { address } = useAccount();

    const shareTrack = () => {
        setSelectedTrack({});
        setCopyToClipboard(true);
        navigator.clipboard.writeText(
            `https://beta.reamp.xyz/tracks/${selectedTrack.slug}`
        );
        setTimeout(() => {
            setCopyToClipboard(false);
        }, 4000);
    };

    const addToPlaylist = () => {
        if (address) {
            setSelectedTrack({});
            toggleModal(selectedTrack);
        }
    };

    return (
        <>
            {copyToClipboard && <CopiedToClipboard/>}
            <div
                className={"w-[204px] z-50 absolute top-0 right-11 border border-whiteDisabled rounded-2xl backdrop-blur-sm text-silver"}
            >
                <div className="pt-6 pl-6">
                    <Link
                        href={`/tracks/${selectedTrack.slug}`}
                        onClick={() => setSelectedTrack({})}
                        className="cursor-pointer mb-6 flex hover:text-white"
                    >
                        <img
                        alt="Globe"
                        src="/icons/Globe.svg"
                        className="h-[21px] w-[21px] mr-[16px]"
                        />
                        <span>Track Details</span>
                    </Link>
                    <div
                        className="cursor-pointer mb-6 flex hover:text-white"
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
                        className="cursor-pointer pb-6 flex hover:text-white"
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
        </>
    )
}

export default TrackPopUp;