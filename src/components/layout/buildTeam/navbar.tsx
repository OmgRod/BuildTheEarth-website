"use client";

import { ActionIcon, AppShellNavbar, Group, Image, Text } from "@mantine/core";

import { UserButton } from "@/components/core/UserButton";
import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import classes from "@/styles/BuildTeamNavbar.module.css";
import { buildTeamNavLinks } from "@/util/links";
import { IconLock } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export interface BuildTeamNavbar {
  currentLink: string;
}

/**
 * Navbar of BuildTeam Pages
 */
export default function BuildTeamNavbar(props: BuildTeamNavbar) {
  const { activeBuildTeam } = useAvailableBuildTeam();
  const router = useRouter();
  const { data: session } = useSession();

  const links = buildTeamNavLinks.map((item) => (
    <a
      className={classes.navbarLink}
      data-active={item.link === props.currentLink}
      href={"/t" + item.link}
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
            <Image src="/logo.png" h={32} alt="BTE Logo" />
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

      <div className={classes.navbarBottom}>
        <UserButton
          title={activeBuildTeam?.name || "Select Build Team..."}
          image={activeBuildTeam?.icon || ""}
          subtitle={session?.user ? `viewing as ${session.user.username}` : ""}
        />
      </div>
    </AppShellNavbar>
  );
}
