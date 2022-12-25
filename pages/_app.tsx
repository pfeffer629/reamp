import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpinampProvider } from "@spinamp/spinamp-hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SpinampProvider>
      <Component {...pageProps} />
    </SpinampProvider>
  );
}
