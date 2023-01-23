function CopiedToClipboard() {
  return (
    <div className="absolute w-[200px] h-[50px] inset-1/2 bg-sidebarBg border border-darkLine rounded-[10px] flex items-center justify-center transition-opacity ease-in duration-700 opacity-100 ">
      <span className="text-selectedTab flex items-center">
        <div
          className="w-[4px] h-[4px] mr-[10px] rounded-[3px] bg-selectedTab inline-block"
        ></div>
        Copied To Clipboard
        </span>
    </div>
  );
}

export default CopiedToClipboard;
