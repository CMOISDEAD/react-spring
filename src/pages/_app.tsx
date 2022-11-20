import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const use = async () => {
      // @ts-ignore
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  return (
    <>
      <Head>
        <meta name="application-name" content="Java Player" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Java Player" />
        <meta name="description" content="Best java-player in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#161616" />

        <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="https://winaero.com/blog/wp-content/uploads/2019/09/Groove-Music-fluent-design-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://winaero.com/blog/wp-content/uploads/2019/09/Groove-Music-fluent-design-icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="https://winaero.com/blog/wp-content/uploads/2019/09/Groove-Music-fluent-design-icon.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="https://winaero.com/blog/wp-content/uploads/2019/09/Groove-Music-fluent-design-icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://winaero.com/blog/wp-content/uploads/2019/09/Groove-Music-fluent-design-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://java-player.netlify.app/" />
        <meta name="twitter:title" content="java player" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta name="twitter:image" content="https://java-player.netlify.app/icons/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@CamiloDavila" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Java Player" />
        <meta property="og:description" content="Best java player in the world" />
        <meta property="og:site_name" content="Java Player" />
        <meta property="og:url" content="https://java-player.netlify.app/" />
        <meta property="og:image" content="https://java-player.netlify.app/icons/apple-touch-icon.png" />
      </Head>
      <Component {...pageProps} />
    </>);
}

export default wrapper.withRedux(MyApp);
