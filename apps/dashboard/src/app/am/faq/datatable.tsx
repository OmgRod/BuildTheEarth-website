'use client';

import { ActionIcon, Code, Group } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';

import { FAQQuestion } from '@repo/db';
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';
import { EditFaqQuestionButton } from './interactivity';

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
					render: (question: FAQQuestion) => (
						<Group gap={4} justify="right" wrap="nowrap">
							<EditFaqQuestionButton
								id={question.id}
								question={question.question}
								answer={question.answer}
								links={question.links}
							/>
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
