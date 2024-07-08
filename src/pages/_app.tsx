import "@/styles/global.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "mantine-datatable/styles.layer.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import SWRSetup from "@/components/core/SWRSetup";
import { SessionProvider } from "next-auth/react";
import { theme } from "@/util/theme";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <SWRSetup>
          <Notifications limit={3} />
          <Component {...pageProps} />
        </SWRSetup>
      </MantineProvider>
    </SessionProvider>
  );
}
