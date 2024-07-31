import { AppShell, Box, ScrollArea } from "@mantine/core";

import { default as Navbar } from "./navbar";

export interface LayoutProps {
  children: React.ReactNode;
  currentLink: string;
  currentSpace: "me" | "team";
  isLoading?: boolean;
  loader?: React.ReactNode;
}

/**
 * Root layout of BuildTeam Pages
 */
export default function Layout(props: LayoutProps) {
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
      h="100vh"
    >
      <AppShell.Navbar p={0}>
        <Navbar
          currentLink={props.currentLink}
          currentSpace={props.currentSpace}
        />
      </AppShell.Navbar>

      <AppShell.Main h="100vh" style={{ overflow: "hidden" }}>
        <ScrollArea
          style={{
            height:
              "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))", // viewport height - height of header - height of footer
          }}
          type="auto"
        >
          <Box
            p={"md"}
            mb="xl"
            style={{
              maxWidth: `calc(100vw - calc(2 * var(--mantine-spacing-md)) - var(--mantine-aside-width, 0px) - var(--mantine-navbar-width, 0px))`, // viewport width - 2*padding - aside width - navbar width

              minHeight: `calc(100vh - calc(2 * var(--mantine-spacing-md)) - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))`, // viewport height - 2*padding - header height - footer height
            }}
          >
            {props.children}
          </Box>
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
