import { useState, useEffect } from "react";

function CopiedToClipboard() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(100);

    setTimeout(() => {
      setOpacity(0);
    }, 3000);

    return;
  }, []);

  return (
    <div
      className={`opacity-${opacity} w-[100vw] top-0 left-0 fixed transition-opacity ease-in duration-200`}
    >
      <div className="w-[200px] h-[50px] mt-[20px] mx-auto bg-sidebarBg border border-darkLine rounded-[10px] flex items-center justify-center">
        <span className="text-selectedTab flex items-center">
          <div className="w-[4px] h-[4px] mr-[10px] rounded-[3px] bg-selectedTab inline-block"></div>
          Copied To Clipboard
        </span>
      </div>
    </div>
  );
}

export default CopiedToClipboard;
