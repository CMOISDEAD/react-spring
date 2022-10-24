import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const use = async () => {
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
