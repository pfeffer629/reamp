import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Reamp.xyz | Discover, Listen, and Collect Music NFTs"
          key="description"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:image" content="/images/Reamp_Cover_BG.png" />
        <meta property="twitter:image" content="/images/Reamp_Cover_BG.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
