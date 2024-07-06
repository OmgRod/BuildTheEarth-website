"use client";

import { ActionIcon, AppShellNavbar, Group, Image, Text } from "@mantine/core";
import { adminNavLinks, toolsNavLiks } from "@/util/links";

import { IconLock } from "@tabler/icons-react";
import classes from "@/styles/BuildTeamNavbar.module.css";
import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import { useSession } from "next-auth/react";

export interface AdminNavbar {
  currentLink: string;
}

/**
 * Navbar of Admin Pages
 */
export default function AdminNavbar(props: AdminNavbar) {
  const links = adminNavLinks.map((item) => (
    <a
      className={classes.navbarLink}
      data-active={item.link === props.currentLink}
      href={"/tools" + item.link}
      key={item.label}
    >
      <item.icon className={classes.navbarLinkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShellNavbar p={0} h="100%">
      <div className={classes.navbarTop}>
        <Group className={classes.navbarHead} justify="space-between">
          <Group>
            <Image src="/logo.png" h={32} alt="BuildTheEarth Logo" />
            <Text fw="bold" fz="xl" lineClamp={1}>
              BuildTheEarth
            </Text>
          </Group>
          <ActionIcon variant="default" size="sm">
            <IconLock style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
        <div className={classes.navbarLinks}>{links}</div>
      </div>
    </AppShellNavbar>
  );
}
