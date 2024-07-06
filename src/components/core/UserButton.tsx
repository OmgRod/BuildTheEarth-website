"use client";

import {
  Avatar,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";

import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import classes from "@/styles/UserButton.module.css";
import { signOut } from "next-auth/react";

interface UserButton {
  image: string;
  title: string;
  subtitle: string;
}

/**
 * Selector of different BuildTeams
 */
export function UserButton(props: UserButton) {
  const { availableBuildTeams, setActiveBuildTeam, activeBuildTeamId } =
    useAvailableBuildTeam();

  return (
    <Menu withinPortal position="right">
      <MenuTarget>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={props.image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {props.title}
              </Text>

              <Text c="dimmed" size="xs">
                {props.subtitle}
              </Text>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </MenuTarget>
      <MenuDropdown>
        {availableBuildTeams?.map((team) => (
          <MenuItem
            leftSection={<Avatar src={team.icon} size={22} />}
            onClick={() => setActiveBuildTeam(team.id)}
            fw={team.id == activeBuildTeamId ? "bold" : undefined}
          >
            {team.name}
          </MenuItem>
        ))}
        <Menu.Divider />
        <Menu.Item
          leftSection={<IconLogout size={14} />}
          color="red"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Menu.Item>
      </MenuDropdown>
    </Menu>
  );
}
