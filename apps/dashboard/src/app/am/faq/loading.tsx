import { Box, Title } from '@mantine/core';

import { DataTable } from 'mantine-datatable';

export default async function Page() {
	return (
		<Box mx="md" maw="90vw">
			<Title order={1} mt="xl" mb="md">
				FAQ Questions
			</Title>
			<DataTable
				columns={[
					{ accessor: 'id', title: '#'},
					{ accessor: 'question' },
					{ accessor: '', title: 'Actions'},
				]}
				records={[]}
				minHeight={500}
				width={"100%"}
				noRecordsText='Loading FAQ Questions...'
			/>
		</Box>
	);
}
