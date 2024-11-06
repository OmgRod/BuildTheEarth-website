'use client';

import { ActionIcon, Code, Group } from '@mantine/core';
import { IconEdit, IconExternalLink } from '@tabler/icons-react';

import { DataTable } from 'mantine-datatable';
import { FAQQuestion } from '@repo/db';
import Link from 'next/link';

export default function FAQDatatabe({ faq }: { faq: FAQQuestion[] }) {
	return (
		<DataTable
			columns={[
				{
					accessor: 'id',
					title: '#',
					render: ({ id }) => <Code>{id.split('-')[0]}</Code>,
					footer: faq.length + ' Questions',
				},
				{ accessor: 'question' },
				{
					accessor: '',
					title: '',
					textAlign: 'right',
					render: (question) => (
						<Group gap={4} justify="right" wrap="nowrap">
							<ActionIcon size="sm" variant="subtle" color="yellow" aria-label="Edit Question">
								<IconEdit size={16} />
							</ActionIcon>
							<ActionIcon
								size="sm"
								variant="subtle"
								color="cyan"
								aria-label="View Question on Website"
								component={Link}
								href={`https://buildtheearth.net/faq#:~:text=${encodeURIComponent(question.question)}`}
								target="_blank"
								rel="noopener"
							>
								<IconExternalLink size={16} />
							</ActionIcon>
						</Group>
					),
				},
			]}
			records={faq}
		/>
	);
}
