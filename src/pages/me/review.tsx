import { Avatar, Badge, Button, Group, Table, Tooltip } from '@mantine/core';

import { IconFileSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../hooks/useUser';

var vagueTime = require('vague-time');

const ReviewPage: NextPage = () => {
	const { t } = useTranslation('me');
	const user = useUser();
	const { data } = useSWR(`/users/${user?.user?.id}/review`);
	console.log(data);

	return (
		<Page
			head={{
				title: 'Review Applications',
				image: 'https://cdn.buildtheearth.net/static/thumbnails/me.png',
			}}
			requiredPermissions={['account.info']}
			loading={!data}
		>
			<Table.ScrollContainer minWidth={800}>
				<Table verticalSpacing="sm">
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Id</Table.Th>
							<Table.Th>Team</Table.Th>
							<Table.Th>Status</Table.Th>
							<Table.Th>Created At</Table.Th>
							<Table.Th></Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data
							?.sort(
								(a: any, b: any) =>
									new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
							)
							.map((a: any) => (
								<Table.Tr key={a.id}>
									<Table.Td>
										<Tooltip label={a.id}>
											<p>{a.id.split('-')[0]}</p>
										</Tooltip>
									</Table.Td>
									<Table.Td>
										<Tooltip label={a.buildteam.name}>
											<Avatar
												size="sm"
												src={a.buildteam.icon}
												component={Link}
												href={`/teams/${a.buildteam.slug}/manage/review`}
											/>
										</Tooltip>
									</Table.Td>

									<Table.Td>
										<Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }}>
											Needs Review
										</Badge>
									</Table.Td>
									<Table.Td>
										<Tooltip
											withinPortal
											label={a.createdAt ? vagueTime.get({ to: new Date(a.createdAt) }) : ''}
											position="top-start"
										>
											<p>{new Date(a.createdAt).toLocaleDateString()} </p>
										</Tooltip>
									</Table.Td>
									<Table.Td>
										<Group gap={0} justify="flex-end">
											<Button
												leftSection={<IconFileSearch size={14} />}
												component={Link}
												href={`/teams/${a.buildteam.slug}/manage/review/${a.id}`}
											>
												Review
											</Button>
										</Group>
									</Table.Td>
								</Table.Tr>
							))}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>
		</Page>
	);
};

export default ReviewPage;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'me'])),
		},
	};
}
