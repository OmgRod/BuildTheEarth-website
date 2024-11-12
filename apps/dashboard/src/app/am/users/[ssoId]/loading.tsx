import { Box, Skeleton, Title } from '@mantine/core';

export default async function Page() {
	return (
		<Box mx="md" maw="90vw">
			<Title order={1} mt="xl" mb="md" display="flex">
				User:{' '}
				<Skeleton w="fit-content" ml="sm">
					XXXXXXXX-XXXX
				</Skeleton>
			</Title>
		</Box>
	);
}
