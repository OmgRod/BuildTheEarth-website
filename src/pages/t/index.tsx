import {
  Avatar,
  ColorSwatch,
  Divider,
  Grid,
  GridCol,
  Image,
  Stack,
  Switch,
  Text,
  rem,
} from "@mantine/core";

import Anchor from "@/components/core/Anchor";
import BuildTeamLayout from "@/components/layout/buildTeam";
import DateCard from "@/components/core/card/DateCard";
import { DiscordInviteCard } from "@/components/core/card/DiscordInviteCard";
import { RawCard } from "@/components/core/card/RawCard";
import TextCard from "@/components/core/card/TextCard";
import { getCountryNames } from "@/util/countries";
import useBuildTeamData from "@/hooks/useBuildTeamData";

export default function Home() {
  const { data } = useBuildTeamData("/");

  return (
    <BuildTeamLayout currentLink="/">
      <Grid>
        <GridCol span={6}>
          <TextCard title="Build Team Name" id="name" text={data?.name} />
        </GridCol>
        <GridCol span={3}>
          <RawCard
            title="Build Team Slug"
            id="id"
            withEdit={false}
            copyText={`teams/${data?.slug}`}
          >
            <Anchor
              fw="bold"
              className="xl2"
              lineClamp={1}
              href={`https://buildtheearth.net/teams/${data?.slug}`}
              target="_blank"
            >
              teams/{data?.slug}
            </Anchor>
          </RawCard>
        </GridCol>
        <GridCol span={3}>
          <TextCard
            title="Build Team ID"
            id="id"
            withEdit={false}
            text={data?.id.split("-")[0]}
          />
        </GridCol>

        <GridCol span={2}>
          <Stack h="100%">
            <RawCard title="Logo" id="icon" withCopy={false}>
              <Avatar
                src={data?.icon}
                w="100%"
                h="100%"
                radius="sm"
                styles={{ image: { objectFit: "contain", height: "unset" } }}
              />
            </RawCard>
            <RawCard
              title="Primary Color"
              id="icon"
              copyText={data?.color}
              style={{ height: "100%" }}
            >
              <ColorSwatch
                color={data?.color}
                w="100%"
                h="calc( 100% - 2 * var(--mantine-spacing-md))"
                radius="sm"
                styles={{ root: {} }}
              />
            </RawCard>
          </Stack>
        </GridCol>
        <GridCol span={10}>
          <RawCard
            title="Background Image"
            id="backgroundImage"
            withCopy={false}
            style={{ height: "100%" }}
          >
            <Image
              src={data?.backgroundImage}
              style={{ aspectRatio: "16 / 9" }}
              alt={data?.name + " Background Image"}
              radius="sm"
            />
          </RawCard>
        </GridCol>

        <GridCol span={4}>
          {data?.invite && (
            <DiscordInviteCard invite={data.invite} withSplash={false} />
          )}
        </GridCol>
        <GridCol span={8}>
          <TextCard
            title="Countries"
            id="location"
            textProps={{ lineClamp: 1 }}
            style={{ height: "100%" }}
            text={getCountryNames(data?.location.split(", ") || []).join(", ")}
          />
        </GridCol>

        <GridCol span={8}>
          <RawCard
            title="About Build Team"
            id="location"
            copyText={data?.about}
            style={{ height: "100%" }}
          >
            <div dangerouslySetInnerHTML={{ __html: data?.about }} />
          </RawCard>
        </GridCol>
        <GridCol span={4}>
          <Stack h="100%">
            <TextCard title="Server IP" id="ip" text={data?.ip} />
            <TextCard
              title="Server Version"
              id="version"
              text={"Minecraft " + data?.version}
            />
            <RawCard
              title="Applications"
              id="allowApplications"
              withCopy={false}
            >
              <Switch checked={data?.allowApplications} size="lg" />
            </RawCard>
            <RawCard
              title="Trial Applications"
              id="allowTrial"
              withCopy={false}
            >
              <Switch checked={data?.allowTrial} size="lg" />
            </RawCard>
            <RawCard
              title="Instantly Accept Applications"
              id="instantAccept"
              withCopy={false}
            >
              <Switch checked={data?.instantAccept} size="lg" />
            </RawCard>
            <RawCard
              title="Builder Claims"
              id="allowBuilderClaim"
              withCopy={false}
            >
              <Switch checked={data?.allowBuilderClaim} size="lg" />
            </RawCard>
          </Stack>
        </GridCol>

        {/* Build Team Socials */}
        {data?.socials.map(
          (social: { id: string; name: string; icon: string; url: string }) => (
            <GridCol span={3} key={`social_${social.id}`}>
              <RawCard
                title={social.name}
                id={`social_${social.id}`}
                withEdit={false}
                copyText={social.url}
              >
                <Anchor
                  fw="bold"
                  className="xl2"
                  lineClamp={1}
                  href={social.url}
                  target="_blank"
                >
                  {replaceTrailingSlash(social.url).split("/").pop()}
                </Anchor>
              </RawCard>
            </GridCol>
          )
        )}
      </Grid>
      <Divider mt="xl" mb="xs" />
      <Text tt="uppercase" fw="bold" fz="sm" c="dimmed" mb="sm">
        Additional Information
      </Text>
      <Grid>
        <GridCol span={12}>
          <RawCard title="Full ID" id="id" withEdit={false} copyText={data?.id}>
            <Anchor
              fw="bold"
              className="xl2"
              lineClamp={1}
              href={`https://api.buildtheearth.net/api/v1/buildteams/${data?.id}`}
              target="_blank"
            >
              {data?.id}
            </Anchor>
          </RawCard>
        </GridCol>
        <GridCol span={12}>
          <DateCard
            id="createdAt"
            title="Created At"
            withEdit={false}
            withCopy={false}
            date={data?.date}
          />
        </GridCol>
        <GridCol span={12}>
          <RawCard
            title="Creator ID"
            id="creatorId"
            withEdit={false}
            copyText={data?.creatorId}
          >
            <Anchor
              fw="bold"
              className="xl2"
              lineClamp={1}
              href={`/t/members/${data?.creatorId}`}
              target="_blank"
            >
              {data?.creatorId}
            </Anchor>
          </RawCard>
        </GridCol>
      </Grid>
    </BuildTeamLayout>
  );
}

function replaceTrailingSlash(string: string): string {
  return string.replace(/\/$/, "");
}
