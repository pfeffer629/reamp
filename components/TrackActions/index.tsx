function TrackActions() {
  return (
    <div className="w-full border-[2px] border-[#272727] rounded-t-[30px] bg-sidebarBg opacity-80 fixed bottom-0 mb-[64px] z-10 flex flex-col justify-center align-center">
    	<div className="mb-[48px] mt-[80px] flex justify-center items-center">
    		<img
	        alt="Globe"
	        src="/icons/Globe.svg"
	        className="h-[21px] w-[21px] mr-[16px]"
	      />
    		<span>Track Details</span>
    	</div>
    	<div className="mb-[48px] flex justify-center items-center">
    		<img
          alt="Playlists"
          src="/icons/Playlists.svg"
          className="h-[21px] w-[21px] mr-[16px]"
        />
    		<span>Add to Playlist</span>
    	</div>
    	<div className="mb-[80px] flex justify-center items-center">
    		<img
          alt="Small Share"
          src="/icons/SmallShare.svg"
          className="h-[21px] w-[21px] mr-[16px]"
        />
    		<span>Share Track</span>
    	</div>
    </div>
  );
}

export default TrackActions;
