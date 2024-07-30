import "@mantine/code-highlight/styles.css";

import { Button, Center, Group, Text, rem } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";

import Anchor from "@/components/core/Anchor";
import { Banner } from "@/components/core/Banner";
import LinkButton from "@/components/core/LinkButton";
import { UserButton } from "@/components/core/UserButton";
import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import { useUser } from "@/hooks/useUser";
import { IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function Debug() {
  const session = useSession();
  const user = useUser();
  const router = useRouter();
  const { activeBuildTeam } = useAvailableBuildTeam();
  return (
    <>
      <Center w="100vw" h="100vh">
        <Banner
          title="BuildTheEarth Tools"
          subtitle="Everything you might need"
          image="./logo_bot.png"
        >
          <Text fz="sm" c="dimmed" maw="25vw">
            This collection features many usefull tools for building in
            BuildTheEarth. It also includes development utilities and other
            assets you might need.
          </Text>
          <LinkButton
            mt="xl"
            rightSection={<IconChevronRight size={14} />}
            href="/tools"
          >
            Explore Tools
          </LinkButton>
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
              signIn("keycloak", { callbackUrl: "/t/select", redirect: true })
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
