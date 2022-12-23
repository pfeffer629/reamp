import {useState, useEffect} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {usePaginatedTracksQuery} from "@spinamp/spinamp-hooks";
import Player from '../components/Player';
import PlayButton from '../components/Icons/PlayButton';
import { ITrack } from "@spinamp/spinamp-sdk";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);
  const timeAgo = new TimeAgo('en-US')

  useEffect(() => {
    if (!isLoading) {
      setCurrentTrack(tracks[0])
    }
  }, [isLoading, tracks]);

  if (isLoading) {
    return <div>Loading</div>
  }

  const handleSelectTrack = (track: ITrack) => {
    setCurrentTrack(track)
    setCurrentTrackIndex(tracks.indexOf(track))
  };

  const handleBack = () => {
    if (currentTrackIndex === 0) {
      setCurrentTrack(tracks[tracks.length - 1])
      setCurrentTrackIndex(tracks.length - 1)
    } else {
      setCurrentTrack(tracks[currentTrackIndex - 1])
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
  };

  const handleNext = () => {
    if (currentTrackIndex === tracks.length - 1) {
      setCurrentTrack(tracks[0])
      setCurrentTrackIndex(0)
    } else {
      setCurrentTrack(tracks[currentTrackIndex + 1])
      setCurrentTrackIndex(currentTrackIndex + 1)
    }
  };

  return (
    <>
      <Head>
        <title>REAMP</title>
        <meta name="description" content="DISCOVER, CONNECT, COLLECT" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4 mb-[80px]">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Cover</th>
              <th className="px-4 py-2">Track</th>
              <th className="px-4 py-2">Released</th>
              <th className="px-4 py-2">Collect</th>
              <th className="px-4 py-2">Liked</th>
            </tr>
          </thead>
          <tbody>
            {tracks &&
              tracks.map((track) => (
              <tr key={track.id}>
                <td className="py-[8px]">
                  <PlayButton className="cursor-pointer m-0 mx-auto" onClick={() => handleSelectTrack(track)} />
                </td>
                <td>
                  <Image
                    className="rounded-md m-0 mx-auto"
                    src={`${track.lossyArtworkUrl}?img-width=50&img-height=50&img-fit=scale-down&img-quality=50`}
                    alt={track.title}
                    width={50}
                    height={50}
                  />
                </td>
                <td className="text-center py-[8px]">
                  <p>{track.title}</p>
                  <p>{track.artist.name}</p>
                </td>
                <td className="text-center py-[8px]">{timeAgo.format(new Date(track.createdAtTime || ''))}</td>
                <td className="text-center py-[8px]"></td>
                <td className="text-center py-[8px]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {currentTrack &&
        <Player 
          currentTrack={currentTrack} 
          handleBack={handleBack} 
          handleNext={handleNext}
        />
      }
    </>
  );
}
