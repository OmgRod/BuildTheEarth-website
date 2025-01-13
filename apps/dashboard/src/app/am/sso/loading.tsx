import { Box, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';

export default async function Page() {
	return (
		<Protection requiredRole="get-config">
			<Box ml="md" maw="50vw">
				<Title order={1} mt="xl" mb="md">
					SSO Configuration and Security
				</Title>
			</Box>
		</Protection>
	);
}
