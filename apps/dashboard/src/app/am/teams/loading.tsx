import { Box, Button, Group, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';
import { IconExternalLink } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';
import { SearchBuildTeams } from './interactivity';

export default function Page() {
	return (
		<Protection requiredRole="get-teams">
			<Box mx="md" maw="90vw">
				<Group justify="space-between" w="100%" mt="xl" mb="md">
					<Title order={1}>Build Regions</Title>
					<Group gap="xs">
						<Button
							variant="light"
							color="cyan"
							component={Link}
							href={`https://buildtheearth.net/teams`}
							target="_blank"
							rightSection={<IconExternalLink size={14} />}
						>
							Open Page
						</Button>
					</Group>
				</Group>
				<SearchBuildTeams mb="md" maw="30%" disabled />
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
					noRecordsText="Loading Build Regions..."
				/>
			</Box>
		</Protection>
	);
}
