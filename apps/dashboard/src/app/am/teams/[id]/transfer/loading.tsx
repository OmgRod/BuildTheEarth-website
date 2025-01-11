import { Box, Skeleton, Title } from '@mantine/core';

export default function Page() {
	return (
		<Box mx="md" maw="90vw">
			<Title order={1} mt="xl" mb="md">
				Transfer and Delete BuildTeam
			</Title>
			<Skeleton height="90vh" width="100%" />
		</Box>
	);
}
