import {useState, useEffect} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {usePaginatedTracksQuery} from "@spinamp/spinamp-hooks";
import Player from '../components/Player';
import PlayButton from '../components/Icons/PlayButton';
import BackButton from '../components/Icons/BackButton';
import ForwardButton from '../components/Icons/ForwardButton';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<ITrack>({});
  const { tracks, isLoading, isError } = usePaginatedTracksQuery(40);
  const timeAgo = new TimeAgo('en-US')

  useEffect(() => {
    if (!isLoading) {
      setCurrentSong(tracks[0])
    }
  }, [isLoading, tracks]);

  if (isLoading) {
    return <div>Loading</div>
  }

  const handleOnReady = () => {
    setIsPlaying(true)
  }

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
                  <PlayButton className="cursor-pointer m-0 mx-auto" onClick={() => setCurrentSong(track)} />
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
      {Object.keys(currentSong).length > 0 &&
        <div className="fixed bg-[#000] h-[80px] w-full bottom-0 flex justify-between items-center px-[22px]">
          <div className="flex">
            <Image
              alt={currentSong?.title}
              height={48}
              width={48}
              src={currentSong?.lossyArtworkUrl}
              className="mr-[22px]"
            />
            <div>
              <p>{currentSong?.title}</p>
              <p>{currentSong?.artist?.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <BackButton className="cursor-pointer" />
              <PlayButton className="cursor-pointer mx-[30px]" />
              <ForwardButton className="cursor-pointer" />
            </div>
            <input type="range" className="w-full max-w-[430px] h-full mt-2"/>
          </div>
          <div>
          hello
          </div>
        </div>
      }
      <div className="hidden"> 
        <Player url={currentSong?.lossyAudioUrl} controls onReady={handleOnReady} playing={isPlaying} />
      </div>
    </>
  );
}
