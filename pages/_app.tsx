import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpinampProvider } from "@spinamp/spinamp-hooks";
import { TrackProvider } from "../contexts/TrackContext";
import Player from "../components/Player";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SpinampProvider>
      <TrackProvider>
        <Component {...pageProps} />
        <Player />
      </TrackProvider>
    </SpinampProvider>
  );
}
