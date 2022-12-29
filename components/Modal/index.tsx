export default function Modal() {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/[0.6] transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="w-[830px] bg-black[/0.6] p-[30px] border-darkLine border-[1px] rounded-2xl">
              <div className="sm:flex sm:items-start">
                <div className="px-[12px] rounded-lg w-[380px] h-[41px] flex items-center bg-transparent relative outline-none border-darkLine border-[1px]">
                  <input
                    type="text"
                    className="w-[380px] pt-[4px] flex items-center bg-transparent relative outline-none ring-0 text-[16px] text-searchbarText"
                    placeholder="Create New Playlist"
                  />
                  <img
                    alt="Add"
                    src="/icons/Add.svg"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}