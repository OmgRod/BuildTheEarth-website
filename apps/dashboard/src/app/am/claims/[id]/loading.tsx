import { Box, Skeleton, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';

export default async function Page() {
	return (
		<Protection requiredRole="get-users">
			<Box mx="md" maw="90vw">
				<Skeleton w="fit-content" ml="sm">
					<Title order={1} mt="xl" mb="md" display="flex">
						Claim XXXXXXXX
					</Title>
				</Skeleton>
			</Box>
		</Protection>
	);
}
