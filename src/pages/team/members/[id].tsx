import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  ActionIcon,
  Avatar,
  Badge,
  Grid,
  GridCol,
  Group,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Text,
  Tooltip,
  rem,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBrandDiscord,
  IconBrandMinecraft,
  IconDots,
  IconExternalLink,
  IconEye,
  IconLock,
  IconReport,
} from "@tabler/icons-react";

import DateCard from "@/components/core/card/DateCard";
import { RawCard } from "@/components/core/card/RawCard";
import TextCard from "@/components/core/card/TextCard";
import StatusBadge from "@/components/data/StatusBadge";
import Layout from "@/components/layout";
import useAvailableBuildTeam from "@/hooks/useAvailableBuildTeam";
import { useUser } from "@/hooks/useUser";
import { toHumanDate } from "@/util/date";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Home() {
  const router = useRouter();
  const user = useUser();
  const userId = router.query.id;
  const { activeBuildTeam } = useAvailableBuildTeam();
  const { data, isLoading } = useSWR(
    `/users/${userId}?asTeam=true&withKeycloak=true`
  );

  return (
    <Layout currentLink="/team/members" currentSpace="team">
      <Group mb="md" justify="space-between">
        <Group gap="xs">
          <ActionIcon variant="default" aria-label="Go back">
            <IconArrowLeft
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
          <Text c="dimmed" fz="sm">
            Go back
          </Text>
        </Group>
        <Menu position="bottom-end">
          <MenuTarget>
            <ActionIcon variant="default" aria-label="Go back">
              <IconDots style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
          </MenuTarget>
          <MenuDropdown>
            <MenuLabel>Links</MenuLabel>
            <MenuItem
              leftSection={
                <IconBrandMinecraft
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
              component={Link}
              href={`https://namemc.com/search?q=${data?.minecraft || data?.name}`}
              target="_blank"
            >
              NameMC Profile
            </MenuItem>
            <MenuItem
              leftSection={
                <IconLock style={{ width: rem(14), height: rem(14) }} />
              }
              component={Link}
              href={`https://auth.buildtheearth.net/admin/master/console/#/website/users/${data?.ssoId}/settings`}
              target="_blank"
            >
              SSO Profile
            </MenuItem>
            <MenuItem
              leftSection={
                <IconBrandDiscord style={{ width: rem(14), height: rem(14) }} />
              }
              component={Link}
              href={`https://discordapp.com/users/${data?.discordId}`}
              target="_blank"
            >
              Discord Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem
              leftSection={
                <IconReport style={{ width: rem(14), height: rem(14) }} />
              }
              component={Link}
              href={`/tools/report?template=user&data=${data?.id}`}
              color="red"
            >
              Report User
            </MenuItem>
          </MenuDropdown>
        </Menu>
      </Group>
      <Grid>
        <GridCol span={6}>
          <RawCard
            title="Username"
            loading={isLoading}
            id="username"
            copyText={data?.username}
            withEdit={false}
          >
            <Group gap="sm">
              <Avatar
                src={data?.avatar || "./avatar.png"}
                radius="50%"
                size={"md"}
                styles={{ image: { objectFit: "contain", height: "unset" } }}
                color="initials"
                name={data?.username}
              />
              <Text fw="bold" className="xl2">
                {isLoading ? "..." : data?.username}
              </Text>
            </Group>
          </RawCard>
        </GridCol>
        <GridCol span={3}>
          <TextCard
            title="User ID"
            loading={isLoading}
            id="id"
            text={data?.id.split("-")[0]}
            copyText={data?.id}
            withEdit={false}
          />
        </GridCol>
        <GridCol span={3}>
          <TextCard
            title="SSO ID"
            loading={isLoading}
            id="ssoId"
            text={data?.ssoId.split("-")[0]}
            copyText={data?.ssoId}
            withEdit={false}
          />
        </GridCol>
        <GridCol span={3}>
          <TextCard
            title="Minecraft Username"
            loading={isLoading}
            id="minecraft"
            text={data?.minecraft || data?.name || "-/-"}
            withEdit={false}
            actions={[
              {
                label: "Open in NameMC",
                icon: IconExternalLink,
                href: `https://namemc.com/search?q=${data?.minecraft || data?.name}`,
                target: "_blank",
              },
            ]}
          />
        </GridCol>
        <GridCol span={4}>
          <TextCard
            title="Discord ID"
            loading={isLoading}
            id="discordId"
            text={data?.discordId}
            withEdit={false}
          />
        </GridCol>
        <GridCol span={5}>
          <DateCard
            title="Account Creation"
            loading={isLoading}
            id="createdTimestamp"
            date={data?.createdTimestamp}
            withTime
            withOpen={false}
            withEdit={false}
          />
        </GridCol>
      </Grid>
      <Accordion
        multiple
        mt="md"
        variant="separated"
        styles={{
          label: {
            fontWeight: "bold",
            fontSize: "var(--mantine-font-size-lg)",
          },
        }}
      >
        <AccordionItem value="applications">
          <AccordionControl>Applications</AccordionControl>
          <AccordionPanel>
            <Table horizontalSpacing="md">
              <TableThead>
                <TableTr>
                  <TableTh>Applied To</TableTh>
                  <TableTh>Status</TableTh>
                  <TableTh>Comments</TableTh>
                  <TableTh>Created At</TableTh>
                  <TableTh></TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {data?.applications
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((application: any) => (
                    <TableTr key={application.id}>
                      <TableTd>
                        <Text
                          c={
                            application.buildteam.id != activeBuildTeam?.id
                              ? "dimmed"
                              : undefined
                          }
                          fz="sm"
                        >
                          {application.buildteam.name}
                          {application.trial && (
                            <StatusBadge
                              status="trial"
                              size="sm"
                              ml="sm"
                              variant={
                                application.buildteam.id != activeBuildTeam?.id
                                  ? "default"
                                  : "gradient"
                              }
                            />
                          )}
                        </Text>
                      </TableTd>
                      <TableTd>
                        <StatusBadge status={application.status} />
                      </TableTd>
                      <TableTd>
                        {application.reason?.length > 20 ? (
                          <Tooltip label={application.reason}>
                            <Text fz="sm">
                              {application.reason.slice(0, 20)}...
                            </Text>
                          </Tooltip>
                        ) : (
                          <Text fz="sm">{application.reason}</Text>
                        )}
                      </TableTd>
                      <TableTd>
                        {toHumanDate(application.createdAt)} (
                        {moment(application.createdAt).fromNow()})
                      </TableTd>
                      <TableTd>
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          color="gray"
                          component={Link}
                          disabled={
                            application.buildteam.id != activeBuildTeam?.id
                          }
                          href={`/team/applications/${application.id}`}
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                      </TableTd>
                    </TableTr>
                  ))}
              </TableTbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="createdBuildTeams">
          <AccordionControl>Owned and Managed BuildTeams</AccordionControl>
          <AccordionPanel>
            <Grid>
              {data?.createdBuildTeams.map((buildTeam: any) => (
                <GridCol key={buildTeam.id} span={4}>
                  <Group
                    wrap="nowrap"
                    style={{
                      borderRadius: "var(--mantine-radius-sm)",
                    }}
                    p="md"
                    bd="1px solid var(--mantine-color-default-border)"
                  >
                    <Avatar
                      src={buildTeam.icon}
                      size={94}
                      radius="md"
                      alt={buildTeam.name + " Logo"}
                    />
                    <div>
                      <Group justify="space-between">
                        <Text size="lg" fw={500}>
                          {buildTeam.name}
                        </Text>
                      </Group>

                      <Group wrap="nowrap" gap={10} mt={3}>
                        {buildTeam.creatorId == user.user.id ? (
                          <Badge
                            variant="gradient"
                            gradient={{ from: "red", to: "orange" }}
                          >
                            Owner
                          </Badge>
                        ) : (
                          <Badge
                            variant="gradient"
                            gradient={{ from: "grape.6", to: "grape" }}
                          >
                            Manager
                          </Badge>
                        )}
                        {data.joinedBuildTeams.length > 0 &&
                          data.joinedBuildTeams.some(
                            (b: any) => b.id == buildTeam.id
                          ) && <Badge variant="gradient">Builder</Badge>}
                      </Group>
                    </div>
                  </Group>
                </GridCol>
              ))}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="joinedBuildTeams">
          <AccordionControl>Joined BuildTeams</AccordionControl>
          <AccordionPanel>
            <Grid>
              {data?.joinedBuildTeams.map((buildTeam: any) => (
                <GridCol key={buildTeam.id} span={4}>
                  <Group
                    wrap="nowrap"
                    style={{
                      borderRadius: "var(--mantine-radius-sm)",
                    }}
                    p="md"
                    bd="1px solid var(--mantine-color-default-border)"
                  >
                    <Avatar
                      src={buildTeam.icon}
                      size={94}
                      radius="md"
                      alt={buildTeam.name + " Logo"}
                    />
                    <div>
                      <Group justify="space-between">
                        <Text size="lg" fw={500}>
                          {buildTeam.name}
                        </Text>
                      </Group>

                      <Group wrap="nowrap" gap={10} mt={3}>
                        {buildTeam.creatorId == user.user.id && (
                          <Badge
                            variant="gradient"
                            gradient={{ from: "red", to: "orange" }}
                          >
                            Owner
                          </Badge>
                        )}{" "}
                        <Badge variant="gradient">Builder</Badge>
                      </Group>
                    </div>
                  </Group>
                </GridCol>
              ))}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="claims">
          <AccordionControl>Claims</AccordionControl>
          <AccordionPanel>
            <Table horizontalSpacing="md">
              <TableThead>
                <TableTr>
                  <TableTh>Name</TableTh>
                  <TableTh>Status</TableTh>
                  <TableTh>Relation</TableTh>
                  <TableTh>Coordinates</TableTh>
                  <TableTh></TableTh>
                </TableTr>
              </TableThead>
              <TableTbody>
                {data?.claims
                  .map((c: any) => ({ ...c, owner: true }))
                  .concat(data?.claimsBuilder)
                  .map((claim: any) => (
                    <TableTr key={claim.id}>
                      <TableTd>
                        <Text fz="sm">{claim.name}</Text>
                      </TableTd>
                      <TableTd>
                        <StatusBadge
                          status={claim.finished ? "finished" : "building"}
                        />
                      </TableTd>
                      <TableTd>
                        {claim.owner ? (
                          <Badge
                            variant="gradient"
                            gradient={{ from: "red", to: "orange" }}
                          >
                            Owner
                          </Badge>
                        ) : (
                          <Badge variant="gradient">Builder</Badge>
                        )}
                      </TableTd>
                      <TableTd>{claim.center}</TableTd>
                      <TableTd>
                        <ActionIcon
                          size="sm"
                          variant="subtle"
                          color="gray"
                          component={Link}
                          href={`https://buildtheearth.net/map?claim=${claim.id}`}
                          target="_blank"
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                      </TableTd>
                    </TableTr>
                  ))}
              </TableTbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Layout>
  );
}
