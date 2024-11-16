import { Badge, Box, Card, Flex, Group, Stack, Text, Title } from '@mantine/core';

import { getUser } from '@/actions/getUser';
import { WebsiteKeycloakUser } from '@/types/User';
import { authedFetcher } from '@/util/data';
import { IconDevices } from '@tabler/icons-react';

export default async function Page() {
	const user = await getUser();
	const data = await authedFetcher<WebsiteKeycloakUser>(`/users/${user.id}/kc`);

	return (
		<Box ml="md" maw="50vw">
			<Title order={1} mt="xl" mb="md">
				Active Sessions
			</Title>
			<Stack>
				{data.sessions.map((session) => (
					<UserSession key={session.id} session={session} />
				))}
			</Stack>
		</Box>
	);
}

function UserSession({ session }: { session: WebsiteKeycloakUser['sessions'][0] }) {
	return (
		<Card withBorder>
			<Flex align={'center'} gap={'md'}>
				<IconDevices size={'3rem'} />
				<Flex gap={5} direction={'column'} style={{ flex: 1 }}>
					<Flex align={'center'} gap={'xs'}>
						<Text fw={'bold'}>Session #{session.id.split('-')[0]} </Text>{' '}
						<Group gap={'xs'}>
							{Object.values(session.clients).map((client) => (
								<Badge key={client} variant="light" color="cyan">
									{client}
								</Badge>
							))}
						</Group>
					</Flex>

					<Text size="sm">
						<b>Last Active: </b>
						{new Date(session.lastAccess).toLocaleString('en-GB', {
							day: '2-digit',
							month: '2-digit',
							year: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
						})}
						,<b> Started at: </b>
						{new Date(session.start).toLocaleString('en-GB', {
							day: '2-digit',
							month: '2-digit',
							year: '2-digit',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</Text>
				</Flex>
			</Flex>
		</Card>
	);
}
