import { Box, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';

export default async function Page() {
	return (
		<Protection requiredRole="get-users">
			<Box ml="md" maw="50vw">
				<Title order={1} mt="xl" mb="md">
					Website Users
				</Title>
			</Box>
		</Protection>
	);
}
