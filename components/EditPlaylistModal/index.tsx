import { useState } from "react";
import { supabase } from "../../utils/supabase";
import Image from "next/image";

type EditPlaylistModalProps = {
    title: string;
    cover: string;
    show: boolean;
    close: any;
};

export default function EditPlaylistModal({ title, cover, show, close }: EditPlaylistModalProps) {
    const [playlistTitle, setTitle] = useState(title);

    return (
        <div
            className={show ? "relative z-10 mb-[80px]" : "hidden"}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="fixed inset-0 bg-black/[0.6] transition-opacity z-5"></div>
                <form
                className="z-10 relative w-[450px] bg-sidebarBg p-[30px] border-darkLine border-[1px] rounded-2xl"
                >
                <h2 className="text-base">Edit Playlist</h2>
                <img
                    alt="Close"
                    src="/icons/Close.svg"
                    className="cursor-pointer absolute right-0 top-0 m-[24px]"
                    onClick={close}
                />
                <div className="flex flex-row align-top">
                    <Image
                        src={cover}
                        alt="playlist"
                        className="rounded-[10px]"
                        height={150}
                        width={150}
                    />
                    <textarea
                        className="rounded-lg text-xs resize-none w-full my-[14px] h-[50px] p-[12px] bg-transparent relative outline-none border-darkLine border-[1px]"
                        value={playlistTitle}
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex flex-row">
                    <button
                        type="submit"
                        className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
                    >
                        Delete Playlist
                    </button>
                    <button
                        type="submit"
                        className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
                    >
                        Save
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
    );
}
