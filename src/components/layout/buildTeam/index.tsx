import {
  AppShell,
  Box,
  Burger,
  ScrollArea,
  ScrollAreaAutosize,
} from "@mantine/core";

import BuildTeamNavbar from "./navbar";
import { useDisclosure } from "@mantine/hooks";

export interface BuildTeamLayout {
  children: React.ReactNode;
  currentLink: string;
}

/**
 * Root layout of BuildTeam Pages
 */
export default function BuildTeamLayout(props: BuildTeamLayout) {
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
        <BuildTeamNavbar currentLink={props.currentLink} />
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
