import "@mantine/code-highlight/styles.css";

import { Button, Divider, Stack, Tabs, rem } from "@mantine/core";
import { IconLock, IconMouse, IconUser, IconUsers } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";

import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import { useUser } from "@/hooks/useUser";
import { CodeHighlight } from "@mantine/code-highlight";

/**
 * Page with Debug information for development or troubleshooting
 */
export default function Debug() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const session = useSession();
  const user = useUser();
  const team = useAvailableBuildTeam();
  return (
    <Tabs defaultValue="actions">
      <Tabs.List>
        <Tabs.Tab value="actions" leftSection={<IconMouse style={iconStyle} />}>
          Actions
        </Tabs.Tab>
        <Tabs.Tab value="avTeams" leftSection={<IconUsers style={iconStyle} />}>
          Available BuildTeams
        </Tabs.Tab>
        <Tabs.Tab value="session" leftSection={<IconLock style={iconStyle} />}>
          Session
        </Tabs.Tab>
        <Tabs.Tab value="user" leftSection={<IconUser style={iconStyle} />}>
          User
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="actions">
        <Stack mt="sm">
          <Button
            onClick={() => signIn("keycloak")}
            disabled={session.status == "authenticated"}
          >
            Sign In
          </Button>
          <Button
            onClick={() => signOut()}
            disabled={session.status != "authenticated"}
          >
            Sign Out
          </Button>
          <Divider />
          <Button onClick={() => team.setActiveBuildTeam("")} variant="outline">
            Clear Active Build Team
          </Button>
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="avTeams">
        <CodeHighlight code={JSON.stringify(team, null, 2)} language="json" />
      </Tabs.Panel>
      <Tabs.Panel value="session">
        <CodeHighlight
          code={JSON.stringify(session, null, 2)}
          language="json"
        />
      </Tabs.Panel>
      <Tabs.Panel value="user">
        <CodeHighlight code={JSON.stringify(user, null, 2)} language="json" />
      </Tabs.Panel>
    </Tabs>
  );
}
