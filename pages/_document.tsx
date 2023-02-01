import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
{/*        <meta
          name="description"
          content="Reamp.xyz | Discover, Listen, and Collect Music NFTs"
          key="description"
        />*/}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
