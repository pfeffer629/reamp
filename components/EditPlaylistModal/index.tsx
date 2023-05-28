import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import PlaylistContext from "../../contexts/PlaylistContext";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useRouter } from "next/navigation";

type EditPlaylistModalProps = {
    id: string;
    title: string;
    cover: string;
    show: boolean;
    close: any;
};

export default function EditPlaylistModal({ show, close }: EditPlaylistModalProps) {
    const { selectedPlaylist, getPlaylist, getPlaylists } = useContext(PlaylistContext);
    const [playlistTitle, setTitle] = useState(selectedPlaylist?.name);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const { editPlaylist, deletePlaylist } = useContext(PlaylistContext);
    const router = useRouter();

    const deleteConfirm = async (id) => {
        await deletePlaylist(id).then(()=> {
            close();
            router.push("/playlists");
        });
    }

    const saveChanges = async (id, newTitle) => {
        await editPlaylist(id, newTitle).then(()=> {
            getPlaylist(id);
        });
        close();
    }

    useEffect(()=>{
        setTitle(selectedPlaylist?.name);
    }, [selectedPlaylist])

    return (
        showDeleteConfirm ? 
        <DeleteConfirmationModal close={()=>{setShowDeleteConfirm(false)}} confirm={()=>{deleteConfirm(selectedPlaylist?.id);}} />
        :
        <div
            className={show ? "relative z-10 mb-[80px]" : "hidden"}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="fixed inset-0 bg-black/[0.6] transition-opacity z-5"></div>
                <div
                className="z-10 relative w-[450px] bg-sidebarBg p-[30px] border-darkLine border-[1px] rounded-2xl"
                >
                <h2 className="text-base">Edit Playlist</h2>
                <img
                    alt="Close"
                    src="/icons/Close.svg"
                    className="cursor-pointer absolute right-0 top-0 m-[24px]"
                    onClick={()=>{close(); setTitle(selectedPlaylist?.title);}}
                />
                <div className="flex flex-row mt-4">
                    <Image
                        src={selectedPlaylist?.cover}
                        alt="playlist"
                        className="rounded-[10px]"
                        height={150}
                        width={150}
                    />
                    <textarea
                        className="rounded-lg text-base resize-none w-full h-[50px] p-[12px] ml-2 bg-transparent relative outline-none border-darkLine border-[1px]"
                        value={playlistTitle}
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex flex-row mt-4 gap-6">
                    <button
                        type="submit"
                        className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
                        onClick={() => {setShowDeleteConfirm(true);}}
                    >
                        Delete Playlist
                    </button>
                    <button
                        type="submit"
                        className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
                        onClick={() => {saveChanges(selectedPlaylist?.id, playlistTitle)}}
                    >
                        Save
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}
