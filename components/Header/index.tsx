import {
  ConnectButton,
} from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <div className="w-[895px] mx-auto py-4">
      <div className="flex items-center justify-between">
        <div className="relative text-searchBarText">
          <input
            type="text"
            className="px-[14px] pl-[34px] rounded-lg w-[380px] h-[41px] pt-[4px] flex items-center bg-blackSecondary relative outline-none ring-0 text-[12px]"
            placeholder="Search web3 artists, collectors, and curators"
          />
          <div className="absolute pl-[14px] top-0 pt-[4px] flex items-center justify-center h-[41px]">
            •
          </div>
        </div>
        <div className="min-w-[330px]">
          <div className="flex justify-end">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
}
