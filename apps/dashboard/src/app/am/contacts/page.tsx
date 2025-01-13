import { getSession, hasRole } from '@/util/auth';
import { Box, Button, Group, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';
import prisma from '@/util/db';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import ContactsDatatable from './datatable';
import { AddContactButton } from './interactivity';

export default async function Page() {
	const contacts = await prisma.contact.findMany();
	const session = await getSession();

	return (
		<Protection requiredRole="get-contacts">
			<Box mx="md" maw="90vw">
				<Group justify="space-between" w="100%" mt="xl" mb="md">
					<Title order={1}>Contacts</Title>
					<Group gap="xs">
						<AddContactButton disabled={!hasRole(session, 'edit-contacts')} />
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
				<ContactsDatatable contacts={contacts} canEdit={hasRole(session, 'edit-contacts')} />
			</Box>
		</Protection>
	);
}
