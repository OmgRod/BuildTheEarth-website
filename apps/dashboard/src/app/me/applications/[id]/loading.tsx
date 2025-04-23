import { Alert, Box, Flex, SimpleGrid, Skeleton, Text, Title } from '@mantine/core';

import { TextCard } from '@/components/core/card/TextCard';
import { BuildTeamDisplay } from '@/components/data/BuildTeam';
import { applicationStatusToAlert } from '@/util/transformers';
import { ApplicationStatus } from '@repo/db';

export default async function Page() {
	return (
		<Box mx="md" maw="90vw">
			<Flex gap="sm" justify="flex-start" align="flex-end" direction="row" wrap="nowrap" mt="xl" mb="md">
				<Title order={1}>
					Application <Skeleton component={'span'}>xxxxxxxx</Skeleton>
				</Title>
			</Flex>
			<SimpleGrid cols={3}>
				<Skeleton>
					<TextCard isText={false} title="Build Region">
						<BuildTeamDisplay team={{ icon: '', name: '', slug: '' }} noAnchor />
					</TextCard>
				</Skeleton>
				<Skeleton>
					<TextCard title="Created At" isText>
						-/-
					</TextCard>
				</Skeleton>
				<Skeleton>
					<TextCard title="Reviewed At" isText>
						-/-
					</TextCard>
				</Skeleton>
			</SimpleGrid>
			<Skeleton mt="md">
				<Alert
					variant="light"
					style={{
						border: `calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-green-outline)`,
					}}
					color={'green'}
					radius="md"
					title={'Loading...'}
					h="100%"
					my="md"
				>
					<Text>{applicationStatusToAlert(ApplicationStatus.SEND).description}</Text>
				</Alert>
			</Skeleton>
			<Skeleton mt="md" mih="40vh">
				<TextCard title="Application Answers">
					<Text c="dimmed" size="md" mb="lg" maw="60%">
						These are the answers you provided in your application. If you believe there is an error or you would like
						to provide additional information, please contact the Build Region directly.
					</Text>
				</TextCard>
			</Skeleton>
		</Box>
	);
}
