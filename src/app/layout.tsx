import "@/styles/global.css";
import "@mantine/charts/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "mantine-datatable/styles.layer.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import AuthProvider from "@/components/AuthProvider";
import SWRSetup from "@/components/core/SWRSetup";
import AppLayout from "@/components/layout";
import { getSession } from "@/util/auth";
import { Notifications } from "@mantine/notifications";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const minecraftFont = localFont({
  src: "../../public/fonts/Minecraft.ttf",
  weight: "100 900",
  display: "swap",
  style: "normal",
  variable: "--font-minecraft",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html
      lang="en"
      className={`${interFont.variable} ${minecraftFont.variable}`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <AuthProvider session={session}>
            <SWRSetup>
              <Notifications limit={3} />
              <AppLayout>{children}</AppLayout>
            </SWRSetup>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
