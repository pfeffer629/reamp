import ethAccounts from "../../utils/ethAccounts";
import PlayButton from "../../components/Icons/PlayButton";
import TimeAgo from "javascript-time-ago";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useState } from "react";

function InfoCard({
  address,
  playlist = { cover: "", tracks: [], user_id: "", name: "", created_at: "" },
  track = { slug: "", lossyArtworkUrl: "", title: "", quantity: 0, artist: {name: "", slug: ""} },
  onClick,
  mobileOnClick,
  collection = false,
}) {
  const timeAgo = new TimeAgo("en-US");

  return (
    <Link href={`/tracks/${track.slug}`}>
      <div className="px-[10px] py-[10px] cursor-pointer transition-all duration-300 ease-in-out bg-transparent hover:bg-sidebarMenuHoverBg inline-block rounded-[14px] w-[223px] max-sm:w-auto max-w-full">
        <div className="relative inline">
          <Image
            src={
              !collection
                ? playlist.cover
                : track.lossyArtworkUrl.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )
            }
            alt="cover"
            className="rounded-[10px]"
            height={204}
            width={204}
          />
          {address && (
            <>
              <div className="max-sm:hidden block">
                <PlayButton
                  className="absolute hover:scale-125 duration-300 ease-in-out top-0 bottom-0 left-0 right-0 m-auto"
                  height={25}
                  width={20}
                  onClick={(event) => {event.preventDefault(); onClick();}}
                />
              </div>
              <div className="max-sm:block hidden">
                <PlayButton
                  className="absolute hover:scale-125 duration-300 ease-in-out top-0 bottom-0 left-0 right-0 m-auto"
                  height={25}
                  width={20}
                  onClick={(event) => {event.preventDefault(); mobileOnClick();}}
                />
              </div>
            </>
          )}
        </div>
        <div className="pt-2">
          <div className="text-whiteDisabled text-xs font-normal">
            {!collection && <span>Playlist • {playlist.tracks.length} </span>}
            {!collection && playlist.tracks.length > 1 && "Tracks"}
            {(collection || playlist.tracks.length === 1) 
            && <span>Track {track.quantity > 1 && `- ${track.quantity} Editions`}</span>}
          </div>
        </div>
        <div className="text-white text-[20px] text-base">
          {!collection ? (playlist.name.length > 22 ? (
            <Marquee gradient={false}>
              {playlist.name}&nbsp;&nbsp;&nbsp;&nbsp;
            </Marquee>
          ) : (
            <span>{playlist.name}</span>
          ))
          : (track.title.length > 22 ? (
            <Marquee gradient={false}>
              {track.title}&nbsp;&nbsp;&nbsp;&nbsp;
            </Marquee>
          ) : (
            <span>{track.title}</span>
          ))}
        </div>
        <div className="text-whiteDisabled text-xs font-normal">
          <Link
            href={`/artists/${track.artist?.slug}`}
            className="hover:underline">
            {collection && track.artist.name}
          </Link>
        </div>
        <div className="flex flex-row items-center pt-1 text-sm space-x-[9px]">
          <Image
            src={
              !collection
                ? ethAccounts[playlist.user_id]["avatar"]
                : ethAccounts[address]["avatar"]
            }
            alt="user"
            className="rounded-xl"
            height={21}
            width={21}
          />
          &nbsp;
          {!collection
            ? ethAccounts[playlist.user_id]["ens"]
            : ethAccounts[address]["ens"]}
        </div>
        {!collection && (
          <div className="pt-2">
            <div className="text-whiteDisabled text-[15px] text-xs">
              {timeAgo.format(new Date(playlist.created_at || 0))}
            </div>
          </div>
        )}
      </div>
    </Link>
    
  );
}

export default InfoCard;
