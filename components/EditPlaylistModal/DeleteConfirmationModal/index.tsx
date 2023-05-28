type DeleteConfirmationModalProps = {
    close: any;
    confirm: any;
};

export default function DeleteConfirmationModal({ close, confirm }: DeleteConfirmationModalProps) {
    return(
        <div
            className={"relative z-10 mb-[80px]"}
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
                <h2 className="text-base">Delete Playlist?</h2>
                <img
                    alt="Close"
                    src="/icons/Close.svg"
                    className="cursor-pointer absolute right-0 top-0 m-[24px]"
                    onClick={close}
                />
                <div className="flex flex-row mt-4">
                    <p className="text-base p-[12px] ml-2">Are you sure you want to delete this playlist?</p>
                </div>
                <div className="flex flex-row mt-4 gap-6">
                    <button
                        type="submit"
                        className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
                        onClick={close}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
                        onClick={() => {confirm(); close();}}
                    >
                        Delete
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}