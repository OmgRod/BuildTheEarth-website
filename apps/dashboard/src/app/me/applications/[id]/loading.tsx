import { Alert, Box, Flex, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';

import { TextCard } from '@/components/core/card/TextCard';
import { BuildTeamDisplay } from '@/components/data/BuildTeam';
import { IconLoader } from '@tabler/icons-react';

export default async function Page() {
	return (
		<Box mx="md" maw="90vw">
			<Flex gap="sm" justify="flex-start" align="flex-end" direction="row" wrap="nowrap" mt="xl" mb="md">
				<Title order={1}>Application XXXXXXXX</Title>
				<Text c="dimmed" fz="sm">
					( ... )
				</Text>
			</Flex>
			<SimpleGrid cols={2}>
				<Skeleton>
					<TextCard isText={false} title="BuildTeam">
						<BuildTeamDisplay team={{ icon: '', name: '', slug: '' }} noAnchor />
					</TextCard>
				</Skeleton>
				<Skeleton>
					<TextCard title="Created At" isText>
						---
					</TextCard>
				</Skeleton>
			</SimpleGrid>
			<Skeleton mt="md">
				<Alert
					variant="light"
					style={{
						border: `calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-orange-outline)`,
					}}
					color="orange"
					radius="md"
					title="Application loading"
					icon={<IconLoader />}
					h="100%"
					my="md"
				>
					<Text>Loading your application... Please be patient.</Text>
				</Alert>
			</Skeleton>
			<Skeleton h="60vh" mt="md"></Skeleton>
		</Box>
	);
}
