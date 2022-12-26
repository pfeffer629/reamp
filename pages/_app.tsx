import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpinampProvider } from "@spinamp/spinamp-hooks";
import { TrackProvider } from "../contexts/TrackContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SpinampProvider>
      <TrackProvider>
        <div className="flex w-[1280px] mx-auto overflow-hidden">
          <Sidebar />
          <div className="mx-auto">
            <Header />
            <Component {...pageProps} />
          </div>
        </div>
        <Player />
      </TrackProvider>
    </SpinampProvider>
  );
}
