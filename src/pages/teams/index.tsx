import {
	ActionIcon,
	Avatar,
	Badge,
	Grid,
	Group,
	Pagination,
	Text,
	TextInput,
	createStyles,
	useMantineTheme,
} from '@mantine/core';
import { Pin, Users, X } from 'tabler-icons-react';
import React, { useState } from 'react';

import { NextPage } from 'next';
import Page from '../../components/Page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';

const elements = [
	{
		logo: 'https://bte-germany.de/logo.gif',
		name: 'Build The Earth Germany',
		short: 'BTE Germany (first element)',
		locations: ['Germany'],
		builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
		id: 'de',
	},
	{
		logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
		name: 'Build The Earth Canada',
		short: 'BTE Canada',
		locations: ['Germany'],
		builders: [],
		id: 'ca',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
		name: 'Build The Earth Italy',
		short: 'BTE Italy',
		locations: ['Italy'],
		builders: [],
		id: 'it',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
		name: 'Build The Earth Iberia',
		short: 'BTE Iberia',
		locations: ['Spain', 'Portugal'],
		builders: [],
		id: 'ib',
	},
	{
		logo: 'https://alps-bte.com/api/assets/logo/0.webp',
		name: 'Build The Earth Alps',
		short: 'Alps BTE',
		locations: ['Switzerland', 'Austria', 'Liechtenstein'],
		builders: ['Nachwahl'],
		id: 'alps',
	},
	{
		logo: 'https://bte-germany.de/logo.gif',
		name: 'Build The Earth Germany',
		short: 'BTE Germany',
		locations: ['Germany'],
		builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
		id: 'de',
	},
	{
		logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
		name: 'Build The Earth Canada',
		short: 'BTE Canada',
		locations: ['Germany'],
		builders: [],
		id: 'ca',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
		name: 'Build The Earth Italy',
		short: 'BTE Italy',
		locations: ['Italy'],
		builders: [],
		id: 'it',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
		name: 'Build The Earth Iberia',
		short: 'BTE Iberia',
		locations: ['Spain', 'Portugal'],
		builders: [],
		id: 'ib',
	},
	{
		logo: 'https://alps-bte.com/api/assets/logo/0.webp',
		name: 'Build The Earth Alps',
		short: 'Alps BTE',
		locations: ['Switzerland', 'Austria', 'Liechtenstein'],
		builders: ['Nachwahl'],
		id: 'alps',
	},
	{
		logo: 'https://bte-germany.de/logo.gif',
		name: 'Build The Earth Germany',
		short: 'BTE Germany',
		locations: ['Germany'],
		builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
		id: 'de',
	},
	{
		logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
		name: 'Build The Earth Canada',
		short: 'BTE Canada',
		locations: ['Germany'],
		builders: [],
		id: 'ca',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
		name: 'Build The Earth Italy',
		short: 'BTE Italy',
		locations: ['Italy'],
		builders: [],
		id: 'it',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
		name: 'Build The Earth Iberia',
		short: 'BTE Iberia',
		locations: ['Spain', 'Portugal'],
		builders: [],
		id: 'ib',
	},
	{
		logo: 'https://alps-bte.com/api/assets/logo/0.webp',
		name: 'Build The Earth Alps',
		short: 'Alps BTE',
		locations: ['Switzerland', 'Austria', 'Liechtenstein'],
		builders: ['Nachwahl'],
		id: 'alps',
	},
	{
		logo: 'https://bte-germany.de/logo.gif',
		name: 'Build The Earth Germany',
		short: 'BTE Germany',
		locations: ['Germany'],
		builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
		id: 'de',
	},
	{
		logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
		name: 'Build The Earth Canada',
		short: 'BTE Canada',
		locations: ['Germany'],
		builders: [],
		id: 'ca',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
		name: 'Build The Earth Italy',
		short: 'BTE Italy',
		locations: ['Italy'],
		builders: [],
		id: 'it',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
		name: 'Build The Earth Iberia',
		short: 'BTE Iberia',
		locations: ['Spain', 'Portugal'],
		builders: [],
		id: 'ib',
	},
	{
		logo: 'https://alps-bte.com/api/assets/logo/0.webp',
		name: 'Build The Earth Alps',
		short: 'Alps BTE',
		locations: ['Switzerland', 'Austria', 'Liechtenstein'],
		builders: ['Nachwahl'],
		id: 'alps',
	},
	{
		logo: 'https://bte-germany.de/logo.gif',
		name: 'Build The Earth Germany',
		short: 'BTE Germany',
		locations: ['Germany'],
		builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
		id: 'de',
	},
	{
		logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
		name: 'Build The Earth Canada',
		short: 'BTE Canada',
		locations: ['Germany'],
		builders: [],
		id: 'ca',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
		name: 'Build The Earth Italy',
		short: 'BTE Italy',
		locations: ['Italy'],
		builders: [],
		id: 'it',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
		name: 'Build The Earth Iberia',
		short: 'BTE Iberia',
		locations: ['Spain', 'Portugal'],
		builders: [],
		id: 'ib',
	},
	{
		logo: 'https://alps-bte.com/api/assets/logo/0.webp',
		name: 'Build The Earth Alps',
		short: 'Alps BTE',
		locations: ['Switzerland', 'Austria', 'Liechtenstein'],
		builders: ['Nachwahl'],
		id: 'alps',
	},
	{
		logo: 'https://bte-germany.de/logo.gif',
		name: 'Build The Earth Germany',
		short: 'BTE Germany',
		locations: ['Germany'],
		builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
		id: 'de',
	},
	{
		logo: 'https://buildtheearth.net/uploads/9f37ed8ed2904c48f97077bd7442b3a4a2051931.png',
		name: 'Build The Earth Canada',
		short: 'BTE Canada',
		locations: ['Germany'],
		builders: [],
		id: 'ca',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5f89364f1e49f7184ee8ccd1b093394e7940d56f.png',
		name: 'Build The Earth Italy',
		short: 'BTE Italy',
		locations: ['Italy'],
		builders: [],
		id: 'it',
	},
	{
		logo: 'https://buildtheearth.net/uploads/5d164a47b2d14f2b7ff2d18a58881f6d1337b4c1.png?size=2',
		name: 'Build The Earth Iberia',
		short: 'BTE Iberia',
		locations: ['Spain', 'Portugal'],
		builders: [],
		id: 'ib',
	},
	{
		logo: 'https://alps-bte.com/api/assets/logo/0.webp',
		name: 'Build The Earth Alps',
		short: 'Alps BTE',
		locations: ['Switzerland', 'Austria', 'Liechtenstein'],
		builders: ['Nachwahl'],
		id: 'alps',
	},
	{
		logo: 'https://bte-germany.de/logo.gif',
		name: 'Build The Earth Germany',
		short: 'BTE Germany (last element)',
		locations: ['Germany'],
		builders: ['Nudelsuppe_42_#3571', 'Nachwahl'],
		id: 'de',
	},
];

const useStyles = createStyles((theme) => ({
	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
	},

	name: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));

const Faq: NextPage = () => {
	const router = useRouter();
	const { t } = useTranslation('teams');
	const theme = useMantineTheme();
	const { classes } = useStyles();
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [activePage, setPage] = useState(1);
	const { data } = useSWR(`/buildteams?page=${activePage - 1}`);
	return (
		<Page
			head={{
				title: t('head.title'),
				large: true,
				image: '/images/placeholder.png',
			}}
		>
			<p>
				{t('description')}
				<br />
				<br />
				{t('joining')}
			</p>
			<TextInput
				placeholder={t('common:search')}
				radius="xs"
				required
				value={search}
				onChange={(event) => setSearch(event.currentTarget.value)}
				rightSection={
					<ActionIcon onClick={() => setSearch('')}>
						<X />
					</ActionIcon>
				}
			/>
			<Grid gutter="xl" style={{ marginTop: theme.spacing.xl }}>
				{data?.data
					.filter((element: any) => element.name.toLowerCase().includes(search?.toLowerCase() || ''))
					//.slice(activePage * 14 - 14, activePage * 14)
					.map((element: any, i: number) => (
						<Grid.Col key={i} sm={6}>
							<Group
								noWrap
								sx={{
									backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
									borderRadius: theme.radius.xs,
									'&:hover': {
										backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],
									},
								}}
								p="md"
								onClick={() => router.push(`/teams/${element.id}`)}
							>
								<Avatar src={element.icon} size={94} radius="md" />
								<div>
									<Group position="apart">
										<Text size="lg" weight={500} className={classes.name}>
											{element.name}
										</Text>

										{/*element.builders.includes('Nudelsuppe_42_#3571') ? <Badge color="green">Builder</Badge> : null*/}
									</Group>

									<Group noWrap spacing={10} mt={3}>
										<Pin size={16} className={classes.icon} />
										<Text size="xs" color="dimmed">
											{element.location}
										</Text>
									</Group>

									<Group noWrap spacing={10} mt={5}>
										<Users size={16} className={classes.icon} />
										<Text size="xs" color="dimmed">
											{element._count.members} Members
										</Text>
									</Group>
								</div>
							</Group>
						</Grid.Col>
					))}
			</Grid>
			<Group position="center" pt="md">
				<Pagination total={data?.pages || 1} radius="xs" page={activePage} onChange={setPage} siblings={1} />
			</Group>
		</Page>
	);
};

export default Faq;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'teams'])),
		},
	};
}