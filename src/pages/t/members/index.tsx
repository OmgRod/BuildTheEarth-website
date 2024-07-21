import {
  ActionIcon,
  Avatar,
  Box,
  Checkbox,
  Code,
  Group,
  Spoiler,
  Text,
} from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconMail,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import Layout from "@/components/layout";
import useBuildTeamData from "@/hooks/useBuildTeamData";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useBuildTeamData(`/members?page=${page}`);

  return (
    <Layout currentLink="/members" team>
      <DataTable
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        mih={"100vh"}
        highlightOnHover
        page={page + 1}
        onPageChange={(p: number) => setPage(p - 1)}
        recordsPerPage={100}
        totalRecords={data?.pages * 100}
        records={data?.data}
        fetching={isLoading}
        columns={[
          {
            accessor: "id",
            // this column has a custom title
            title: "#",
            // right-align column
            textAlign: "right",
            render: (record) => {
              return record.id.split("-")[0];
            },
          },
          {
            accessor: "username",
            render: (record) => {
              return (
                <Group gap="sm">
                  <Avatar
                    size={26}
                    src={record.avatar}
                    radius={26}
                    color={record.username ? "green" : "red"}
                    name={record.username || "#"}
                  ></Avatar>
                  <Text size="sm" fw={500}>
                    {record.username}
                  </Text>
                </Group>
              );
            },
          },
          {
            accessor: "discordId",
            title: "Discord Id",
            render: (record) => {
              return <Code>{record.discordId}</Code>;
            },
          },
          {
            accessor: "email",
            title: "E-Mail",
            render: (record) => {
              return (
                <Group gap="sm">
                  <Checkbox checked={record.emailVerified} />
                  <Text size="sm">{record.email}</Text>
                </Group>
              );
            },
          },
          {
            accessor: "actions",
            textAlign: "right",
            width: "0%",
            render: (record) => (
              <Group gap={4} justify="right" wrap="nowrap">
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="gray"
                  component={Link}
                  href={`/t/members/${record.id}`}
                >
                  <IconEye size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="light">
                  <IconEdit size={16} />
                </ActionIcon>
                <ActionIcon size="sm" variant="light" color="red">
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
          {
            accessor: "ssoId",
            hidden: true,
          },
          {
            accessor: "avatar",
            hidden: true,
          },
          {
            accessor: "emailVerified",
            hidden: true,
          },
        ]}
      />
    </Layout>
  );
}
