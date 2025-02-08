import { Box, Button, Group, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';
import { IconExternalLink } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';
import { SearchClaims } from './interactivity';

export default function Page() {
	return (
		<Protection requiredRole="get-claims">
			<Box mx="md" maw="90vw">
				<Group justify="space-between" w="100%" mt="xl" mb="md">
					<Title order={1}>Claims</Title>
					<Group gap="xs">
						<Button
							variant="light"
							color="cyan"
							component={Link}
							href={`https://buildtheearth.net/map`}
							target="_blank"
							rightSection={<IconExternalLink size={14} />}
						>
							Open Map
						</Button>
					</Group>
				</Group>
				<SearchClaims mb="md" maw="30%" disabled />
				<DataTable
					columns={[
						{
							accessor: 'id',
							title: '#',

							width: 250,
						},
						{
							accessor: 'name',
							width: 450,
						},
						{
							accessor: 'location',
						},
						{
							accessor: 'ip',
						},
						{
							accessor: 'creator.username',
							title: 'Creator',
						},
						{
							accessor: '',
							title: '',
							textAlign: 'right',
						},
					]}
					records={[]}
					minHeight={500}
					width={'100%'}
					noRecordsText="Loading Claims..."
				/>
			</Box>
		</Protection>
	);
}
