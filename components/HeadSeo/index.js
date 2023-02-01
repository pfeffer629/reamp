import Head from "next/head"
import siteMetadata from "@data/siteMetadata"

const HeadSeo = ({
    title,
    description,
    ogImageUrl,
}) => {

  return (
    <Head>
      <title>{title}</title>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
      />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      {children}
    </Head>
  )
}

export default HeadSeo