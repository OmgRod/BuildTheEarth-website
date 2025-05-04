import { Box, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';

export default async function Page() {
	return (
		<Protection requiredRole="get-uploads">
			<Box ml="md" maw="50vw">
				<Title order={1} mt="xl" mb="md">
					Image Uploads
				</Title>
			</Box>
		</Protection>
	);
}
