'use client';

import { ActionIcon, Box, Button, Text, Title } from '@mantine/core';

import { IconChevronDown } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';

export default function NotFound() {
	const [opened, { toggle }] = useDisclosure(false);
	const pathname = usePathname();

	return (
		<Box mx="md" maw="90vw">
			<Title order={1} mt="xl" mb="md">
				Something is not right...
			</Title>
			<Text c="dimmed" size="md" maw="40%">
				The Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
				another URL. If you think this is an error please contact us.{' '}
				<ActionIcon size="xs" variant="transparent" color="gray" pt="xs" onClick={toggle}>
					<IconChevronDown size={16} />
				</ActionIcon>
			</Text>
			{opened && (
				<Text c="dimmed" size="sm" maw="40%" mt="md">
					Page: {pathname}
				</Text>
			)}
			<Button variant="outline" size="sm" mt="lg">
				Go Back
			</Button>
		</Box>
	);
}
