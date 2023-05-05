import { useState, useContext } from "react";
import Link from "next/link";
import TrackActionContext from "../../contexts/TrackActionContext";
import PlaylistContext from "../../contexts/PlaylistContext";
import { useAccount } from "wagmi";

function TrackPopUp({shareTrack, position}) {
    const { selectedTrack, setSelectedTrack } = useContext(TrackActionContext);
    const { toggleModal } = useContext(PlaylistContext);
    const { address } = useAccount();

    const addToPlaylist = () => {
        if (address) {
            setSelectedTrack({});
            toggleModal(selectedTrack);
        }
    };

    return (
        <>
            <div
                className={`${position.x && position.y ? "fixed" : "absolute top-0 right-11"} w-[204px] z-50 border border-whiteDisabled rounded-2xl backdrop-blur-sm text-silver`}
                style={position.x && position.y && {top:`${position.y}px`, left: `${position.x}px`}}>
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
                        className="cursor-pointer pb-6 flex hover:text-white"
                        onClick={shareTrack}
                    >
                        <img
                        alt="Small Share"
                        src="/icons/SmallShare.svg"
                        className="h-[21px] w-[21px] mr-[16px]"
                        />
                        <span>Share</span>
                    </div>
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
                </div>
            </div>
        </>
    )
}

export default TrackPopUp;