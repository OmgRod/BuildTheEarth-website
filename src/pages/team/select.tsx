import "@mantine/code-highlight/styles.css";

import {
  Avatar,
  Button,
  Center,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  rem,
} from "@mantine/core";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

import Anchor from "@/components/core/Anchor";
import { Banner } from "@/components/core/Banner";
import { UserButton } from "@/components/core/UserButton";
import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";

export default function Debug() {
  const session = useSession();
  const router = useRouter();
  const {
    activeBuildTeam,
    setActiveBuildTeam,
    availableBuildTeams,
    activeBuildTeamId,
  } = useAvailableBuildTeam();
  return (
    <>
      <Center w="100vw" h="100vh">
        <Banner
          title="BuildTheEarth Dashboard"
          subtitle="Manage your BuildTeam"
          image="/logo.png"
        >
          <Text fz="sm" c="dimmed" maw="25vw">
            This Dashboard includes all information of your BuildTeam. You can
            also manage your members and other services here.
          </Text>

          <Menu withinPortal position="right">
            <MenuTarget>
              <Button mt="xl" rightSection={<IconChevronRight size={14} />}>
                Select a BuildTeam
              </Button>
            </MenuTarget>
            <MenuDropdown>
              {availableBuildTeams?.map((team) => (
                <MenuItem
                  key={team.id}
                  leftSection={<Avatar src={team.icon} size={22} />}
                  onClick={() => {
                    setActiveBuildTeam(team.id);
                    router.push("/t");
                  }}
                  fw={team.id == activeBuildTeamId ? "bold" : undefined}
                >
                  {team.name}
                </MenuItem>
              ))}
            </MenuDropdown>
          </Menu>
        </Banner>
      </Center>
      <Group
        style={{
          position: "absolute",
          bottom: "var(--mantine-spacing-lg)",
        }}
        justify="center"
        w="100vw"
      >
        {session.status == "authenticated" ? (
          <div style={{ width: "20vw" }}>
            <UserButton
              title={session.data.user.username}
              image={"./logo.png"}
              subtitle="Click to choose BuildTeam"
              onClick={() => router.push("/t")}
            />
          </div>
        ) : (
          <Text
            fz="sm"
            c="dimmed"
            onClick={() =>
              signIn("keycloak", { callbackUrl: "/t", redirect: true })
            }
            style={{ cursor: "pointer" }}
          >
            Sign in instead
          </Text>
        )}
      </Group>
    </>
  );
}
