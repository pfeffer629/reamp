import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SpinampProvider } from "@spinamp/spinamp-hooks";
import { TrackProvider } from "../contexts/TrackContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
  ],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }),
    publicProvider(),
  ]
);

const { wallets } = getDefaultWallets({
  appName: 'REAMP',
  chains,
});

const demoAppInfo = {
  appName: 'REAMP',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
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
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <div className="flex w-[1280px] mx-auto overflow-hidden">
              <Sidebar />
              <div className="mx-auto">
                <Header />
                <Component {...pageProps} />
              </div>
            </div>
            <Player />
          </RainbowKitProvider>
        </TrackProvider>
      </SpinampProvider>
    </WagmiConfig>
  );
}
