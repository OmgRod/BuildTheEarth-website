"use client";

import { AppShellNavbar, Group, Image, Text } from "@mantine/core";
import { IconLogout, IconSwitchHorizontal } from "@tabler/icons-react";

import classes from "@/styles/Navbar.module.css";
import { navLinks } from "@/util/links";
import { signOut } from "next-auth/react";
import Anchor from "../core/Anchor";

export interface ToolsNavbar {
  currentLink: string;
  currentSpace: "me" | "team";
}

/**
 * Main Navbar
 */
export default function ToolsNavbar(props: ToolsNavbar) {
  const links = navLinks[props.currentSpace].map((item) => (
    <a
      className={classes.navbarLink}
      data-active={item.link == props.currentLink}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.navbarLinkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShellNavbar p={"sm"} h="100%">
      <div className={classes.navbarTop}>
        <Group className={classes.navbarHead} justify="space-between">
          <Group>
            <Image src="/logo.png" h={32} alt="BuildTheEarth Logo" />
            <Text fw="bold" fz="xl" lineClamp={1}>
              MyBuildTheEarth
            </Text>
          </Group>
        </Group>

        <div className={classes.navbarLinks}>{links}</div>
      </div>
      <div className={classes.navbarBottom}>
        {props.currentSpace == "team" ? (
          <Anchor href="/" className={classes.navbarLink} underline="never">
            <IconSwitchHorizontal
              className={classes.navbarLinkIcon}
              stroke={1.5}
            />
            <span>My Dashboard</span>
          </Anchor>
        ) : (
          <Anchor href="/team" className={classes.navbarLink} underline="never">
            <IconSwitchHorizontal
              className={classes.navbarLinkIcon}
              stroke={1.5}
            />
            <span>Team Dashboard</span>
          </Anchor>
        )}

        <a className={classes.navbarLink} onClick={() => signOut()}>
          <IconLogout className={classes.navbarLinkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </AppShellNavbar>
  );
}
