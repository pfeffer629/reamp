import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpinampProvider } from "@spinamp/spinamp-hooks";
import { TrackProvider } from "../contexts/TrackContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { PlaylistProvider } from "../contexts/PlaylistContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import PlaylistModal from "../components/PlaylistModal";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY as string }),
    publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: "REAMP",
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <SpinampProvider>
        <TrackProvider>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({ accentColor: "#222222" })}
          >
            <FavoritesProvider>
              <PlaylistProvider>
                {/*<title>
                  Reamp.xyz | Discover, listen, and collect Music NFTs
                </title>*/}
                <div className="flex w-[1280px] font-Gilroy overflow-hidden">
                  <Sidebar />
                  <div className="mx-auto w-[895px]">
                    <Header />
                    <Component {...pageProps} />
                  </div>
                  <PlaylistModal />
                </div>
                <Player />
              </PlaylistProvider>
            </FavoritesProvider>
          </RainbowKitProvider>
        </TrackProvider>
      </SpinampProvider>
    </WagmiConfig>
  );
}
