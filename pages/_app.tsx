import "../styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { SpinampProvider } from "@spinamp/spinamp-hooks";
import { TrackProvider } from "../contexts/TrackContext";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { PlaylistProvider } from "../contexts/PlaylistContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import Player from "../components/Player";
import MobileFooter from "../components/MobileFooter";
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
import { Analytics } from "@vercel/analytics/react";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/router";

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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    mixpanel.init("e27b3a18d1177ae9e6b66e8ea292cf5e", {
      debug: true,
      ignore_dnt: true,
    });
    mixpanel.track("page_view");
  }, []);

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
                <title>
                  Reamp.xyz | Discover, listen, and collect Music NFTs
                </title>
                <div className="flex max-sm:w-[100vw] w-[1280px] font-Gilroy overflow-hidden">
                  {showMobileSidebar && 
                    <div className={`z-10 ease-in-out duration-300 ${showMobileSidebar ? "translate-x-0 " : "translate-x-full"}`}>
                      <MobileSidebar />
                    </div>
                  }
                  <Sidebar handleClose={() => setShowMobileSidebar(false)} />
                  <div className="mx-auto max-sm:m-0 max-sm:w-[100vw] w-[895px]">
                    <div className="max-sm:hidden block">
                      <Header />
                    </div>
                    <div className="max-sm:flex justify-center hidden">
                      <img
                        src="/icons/Hamburger.svg"
                        alt="Hamburger"
                        className="absolute top-0 left-0 m-[24px] cursor-pointer"
                        onClick={() => setShowMobileSidebar(true)}
                      />
                      <img
                        src="/images/Reamp_WHT.svg"
                        alt="reamp logo"
                        className="w-[115px] group-hover:opacity-0 transition-all my-[18px] max-sm:pb-0 pb-[80px]"
                      />
                    </div>
                    <Component {...pageProps} onClick={() => setShowMobileSidebar(false)} />
                  </div>
                  <PlaylistModal />
                </div>
                <div
                  className={`${
                    currentRoute === "/playing"
                      ? "overflow-x-hidden"
                      : "max-sm:hidden block pt-[80px]"
                  }`}
                >
                  <Player />
                </div>
                <span className="max-sm:block hidden">
                  <MobileFooter />
                </span>
                <Analytics />
              </PlaylistProvider>
            </FavoritesProvider>
          </RainbowKitProvider>
        </TrackProvider>
      </SpinampProvider>
    </WagmiConfig>
  );
}
