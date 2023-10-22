import { Avatar, Badge, Button, Center, Code, Grid, Group, Stack, Text, rem, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconBuilding, IconConfetti, IconCrane, IconExternalLink, IconLink, IconLogout, IconPencil, IconPin } from '@tabler/icons-react';
import { Pin, Users } from 'tabler-icons-react';
import { signOut, useSession } from 'next-auth/react';

import Link from 'next/link';
import { NextPage } from 'next';
import Page from '../../components/Page';
import getCountryName from '../../utils/ISOCountries';
import router from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../hooks/useUser';

const MePage: NextPage = () => {
	const user = useUser();
	const { data } = useSWR(`/users/${user?.user?.id}`);
	const { t } = useTranslation('me');
	const scheme = useMantineColorScheme();
	const theme = useMantineTheme();

	return (
		<Page
			head={{
				title: t('head.title'),
				image: 'https://cdn.buildtheearth.net/static/thumbnails/me.png',
			}}
		>
			{data ? (
				<>
					<p>{t('description')}</p>
					<h2>{t('account.title')}</h2>
					<Text>
						{t('account.minecraft')} <Code>{data.name}</Code>
					</Text>
					<Group>
						<Button leftSection={<IconPencil />} component={Link} href={`/me/settings/general`} mt="md">
							{t('account.settings')}
						</Button>

						<Button leftSection={<IconLogout />} mt="md" onClick={() => signOut({ callbackUrl: '/' })} variant="outline">
							{t('common:auth.signout')}
						</Button>
					</Group>
					<h2>{t('teams.title')}</h2>
					<p>{t('teams.description')}</p>
					<Grid mb="md">
						{data.joinedBuildTeams.length > 0 ? (
							data.joinedBuildTeams?.map((element: any, i: number) => (
								<Grid.Col key={i} span={{ sm: 6 }}>
									<Group
										wrap="nowrap"
										style={{
											backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
											borderRadius: theme.radius.xs,
											cursor: 'pointer',
										}}
										p="md"
										onClick={() => router.push(`/teams/${element.id}`)}
									>
										<Avatar src={element.icon} size={94} radius="md" />
										<div>
											<Group justify="space-between">
												<Text size="lg" fw={500}>
													{element.name}
												</Text>
											</Group>
											<Badge variant="gradient">{t('common:builder')}</Badge>

											<Group wrap="nowrap" gap={10} mt={8}>
												<Pin size={16} />
												<Text size="xs" c="dimmed">
													{element.location
														.split(', ')
														.slice(0, 3)
														.map((e: string) => getCountryName(e))
														.join(', ')}
												</Text>
											</Group>
										</div>
									</Group>
								</Grid.Col>
							))
						) : (
							<Grid.Col
								span={12}
								style={{
									backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
									borderRadius: theme.radius.xs,
									cursor: 'pointer',
									minHeight: '10vh',
								}}
								p="md"
							>
								<Stack align="center" m="md">
									<Text fw="bold" size="lg">
										{t('teams.empty.description')}
									</Text>
									<Button leftSection={<IconExternalLink />} variant="gradient" component={Link} href="/teams">
										{t('teams.empty.action')}
									</Button>
								</Stack>
							</Grid.Col>
						)}
					</Grid>
					{data.createdBuildTeams.length > 0 && (
						<>
							<h2>{t('owned.title')}</h2>
							<p>{t('owned.description')}</p>
							<Grid mb="md">
								{data.createdBuildTeams?.map((element: any, i: number) => (
									<Grid.Col key={i} span={{ sm: 6 }}>
										<Group
											wrap="nowrap"
											style={{
												backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
												borderRadius: theme.radius.xs,
												cursor: 'pointer',
											}}
											p="md"
											onClick={() => router.push(`/teams/${element.id}`)}
										>
											<Avatar src={element.icon} size={94} radius="md" />
											<div>
												<Group justify="space-between">
													<Text size="lg" fw={500}>
														{element.name}
													</Text>
												</Group>

												<Group wrap="nowrap" gap={10} mt={3}>
													<Pin size={16} />
													<Text size="xs" c="dimmed">
														{element.location
															.split(', ')
															.slice(0, 3)
															.map((e: string) => getCountryName(e))
															.join(', ')}
													</Text>
												</Group>
												<Button mt="xs" variant="gradient" size="xs" leftSection={<IconPencil />} component={Link} href={`/teams/${element.id}/settings`}>
													{t('owned.action')}
												</Button>
											</div>
										</Group>
									</Grid.Col>
								))}
							</Grid>
						</>
					)}
					{data.claims.length > 0 && (
						<>
							<h2>{t('claims.title')}</h2>
							<p>{t('claims.description')}</p>
							<Grid mb="md" mih="10vh">
								{data.claims?.concat(data.claimsBuilder).map((element: any, i: number) => (
									<Grid.Col key={i} span={{ sm: 6 }}>
										<Group
											wrap="nowrap"
											style={{
												backgroundColor: scheme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
												borderRadius: theme.radius.xs,
												cursor: 'pointer',
											}}
											p="md"
										>
											<Avatar size={96} radius="md" color={element.finished ? 'green' : 'orange'}>
												<IconPin size="2rem" />
											</Avatar>
											<div>
												<Group justify="space-between">
													<Text size="lg" fw={500} style={{ wordWrap: 'break-word' }}>
														{element.name}
													</Text>
												</Group>
												{element.finished ? (
													<Badge variant="gradient" gradient={{ from: 'green', to: 'lime' }} leftSection={<IconConfetti style={{ width: rem(16), height: rem(16) }} />}>
														{t('claims.status.finished')}
													</Badge>
												) : (
													<Badge variant="gradient" gradient={{ from: 'orange', to: 'yellow' }} leftSection={<IconCrane style={{ width: rem(12), height: rem(12) }} />}>
														{t('claims.status.building')}
													</Badge>
												)}
												<Group justify="space-between">
													<Button mt="xs" variant="gradient" size="xs" leftSection={<IconPencil />} component={Link} href={`/me/claims/${element.id}`}>
														{t('claims.action')}
													</Button>
												</Group>
											</div>
										</Group>
									</Grid.Col>
								))}
							</Grid>
						</>
					)}
				</>
			) : (
				<>loading</>
			)}
		</Page>
	);
};

export default MePage;

export async function getStaticProps({ locale }: any) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'me'])),
		},
	};
}
