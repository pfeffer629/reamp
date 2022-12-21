import {useRef} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {usePaginatedTracksQuery} from "@spinamp/spinamp-hooks";

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export default function Home() {
  const { tracks, isLoading, isError, refetch } = usePaginatedTracksQuery(40);
  const timeAgo = new TimeAgo('en-US')

  if (isLoading) {
    return <div>Loading</div>
  }  

  return (
    <>
      <Head>
        <title>REAMP</title>
        <meta name="description" content="DISCOVER, CONNECT, COLLECT" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">Cover</th>
              <th className="px-4 py-2">Platform</th>
              <th className="px-4 py-2">Track</th>
              <th className="px-4 py-2">Released</th>
              <th className="px-4 py-2">Collect</th>
              <th className="px-4 py-2">Liked</th>
            </tr>
          </thead>
          <tbody className="gap-2">
            {tracks &&
              tracks.map((track) => (
              <tr key={track.id}>
                <td className="align-middle text-center"></td>
                <td className="align-middle text-center">
                  <img
                    className="w-12 h-12 rounded-md"
                    src={track.lossyArtworkUrl}
                  />
                </td>
                <td className="align-middle text-center">{track.platformId}</td>
                <td className="align-middle text-center">{track.title}</td>
                <td className="align-middle text-center">{timeAgo.format(new Date(track.createdAtTime))}</td>
                <td className="align-middle text-center"></td>
                <td className="align-middle text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
