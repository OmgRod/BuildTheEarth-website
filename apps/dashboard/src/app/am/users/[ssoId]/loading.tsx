import { Box, Skeleton, Title } from '@mantine/core';

export default async function Page() {
	return (
		<Box mx="md" maw="90vw">
			<Skeleton w="fit-content" ml="sm">
				<Title order={1} mt="xl" mb="md" display="flex">
					XXXXXXXX-XXXX
				</Title>
			</Skeleton>
		</Box>
	);
}
