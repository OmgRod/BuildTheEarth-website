import "@/styles/global.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";

import SWRSetup from "@/components/core/SWRSetup";
import { theme } from "@/util/theme";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
      <SessionProvider session={session}>
    <MantineProvider theme={theme}>
<SWRSetup >
      <Component {...pageProps} /></SWRSetup>
    </MantineProvider>
      </SessionProvider>
  );
}
