import { Box, Button, Group, Title } from '@mantine/core';

import prisma from '@/util/db';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import ContactsDatatable from './datatable';
import { AddContactButton } from './interactivity';

export default async function Page() {
	const contacts = await prisma.contact.findMany();

	return (
		<Box mx="md" maw="90vw">
			<Group justify="space-between" w="100%" mt="xl" mb="md">
				<Title order={1}>Contacts</Title>
				<Group gap="xs">
					<AddContactButton />
					<Button
						variant="light"
						color="cyan"
						component={Link}
						href={`https://buildtheearth.net/contact`}
						target="_blank"
						rightSection={<IconExternalLink size={14} />}
					>
						Open Page
					</Button>
				</Group>
			</Group>
			<ContactsDatatable contacts={contacts} />
		</Box>
	);
}
