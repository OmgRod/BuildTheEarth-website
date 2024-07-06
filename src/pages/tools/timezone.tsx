/* eslint-disable react-hooks/exhaustive-deps */

import {
  Divider,
  Grid,
  GridCol,
  SimpleGrid,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";

import { DateTimePicker } from "@mantine/dates";
import { IconSearch } from "@tabler/icons-react";
import Layout from "@/components/layout";
import { RawCard } from "@/components/core/card/RawCard";
import TextCard from "@/components/core/card/TextCard";
import moment from "moment-timezone";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date | undefined | null>(
    router.query?.date ? new Date(router.query.date as string) : new Date()
  );
  let loadedDate = moment(date);

  useEffect(() => {
    if (date != undefined && date?.toISOString() != router.query?.date) {
      router.replace({
        query: { date: date?.toISOString() },
      });
      loadedDate = moment(date);
    }
  }, [date, router]);

  return (
    <Layout currentLink="/timezone" tools>
      <Grid>
        <GridCol span={8}>
          <RawCard
            id="date"
            withEdit={false}
            withCopy={false}
            title="Select Time and Date"
            style={{ height: "100%" }}
          >
            <DateTimePicker
              dropdownType="modal"
              value={date || undefined}
              onChange={(v) => setDate(v)}
            />
          </RawCard>
        </GridCol>
        <GridCol span={4}>
          <TextCard
            id="ago"
            withEdit={false}
            title="Time from now"
            text={loadedDate.fromNow()}
          />
        </GridCol>
      </Grid>
      <Divider mt="xl" mb="xs" />
      <Text tt="uppercase" fw="bold" fz="sm" c="dimmed" mb="sm">
        All Timezones
      </Text>
      <TextInput
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rightSection={
          <IconSearch style={{ width: rem(16), height: rem(16) }} />
        }
      />
      <SimpleGrid cols={3} spacing="sm" mt={10}>
        {moment.tz
          .names()
          .filter((zone) => zone.toLowerCase().includes(search.toLowerCase()))
          .map((zone) => (
            <TextCard
              id="timezone"
              title={zone + loadedDate.tz(zone).format(" [(]z [/] Z[)]")}
              withEdit={false}
              key={zone}
              text={loadedDate.tz(zone).format("DD.MM.yyyy HH:mm")}
            ></TextCard>
          ))}
      </SimpleGrid>
    </Layout>
  );
}
