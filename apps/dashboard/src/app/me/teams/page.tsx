import { Avatar, Box, Card, Grid, GridCol, Group, Stack, Text, Title, Tooltip } from '@mantine/core';

import { getSession } from '@/util/auth';
import { getCountryNames } from '@/util/countries';
import { toHumanDate } from '@/util/date';
import prisma from '@/util/db';
import { IconCalendarCheck, IconMapPin } from '@tabler/icons-react';
import Link from 'next/link';

export default async function Page() {
	const session = await getSession();
	const teams = await prisma.buildTeam.findMany({
		where: { members: { some: { ssoId: session?.user.id } } },
		select: {
			id: true,
			name: true,
			location: true,
			icon: true,
			Application: {
				where: { user: { ssoId: session?.user.id }, status: 'ACCEPTED' },
				select: { createdAt: true, id: true, status: true },
				orderBy: { createdAt: 'desc' },
			},
			slug: true,
		},
	});

	// 30 sec delay
	await new Promise((resolve) => setTimeout(resolve, 5000));

	return (
		<Box ml="md" maw="50vw">
			<Title order={1} mt="xl" mb="md">
				Participating BuildTeams
			</Title>
			<Text c="dimmed" size="md" mb="lg">
				This list contains all BuildTeams you are currently a member of. Each BuildTeam has its own Discord server and
				custom requirements, so make sure to join their server and read their information.
			</Text>
			<Stack gap="lg">
				{teams.map((team) => {
					return (
						<Card
							key={team.id}
							className="animate-scale"
							component={Link}
							href={`https://buildtheearth.net/teams/${team.slug}`}
							target="_blank"
						>
							<Grid>
								<GridCol span={0.75}>
									<Avatar size={32} src={team.icon} />
								</GridCol>
								<GridCol span={6.25}>
									<Stack>
										<Title order={4}>{team.name}</Title>
									</Stack>
								</GridCol>
								<GridCol span={5}>
									<Group wrap="nowrap" gap={5} mt={5}>
										<IconMapPin
											stroke={1.5}
											size={16}
											color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))"
										/>
										<Tooltip label={getCountryNames(team.location.split(', ')).join(', ')}>
											<Text fz="xs" c="dimmed">
												{getCountryNames(team.location.split(', ').slice(0, 2)).join(', ')}{' '}
												{team.location.split(', ').length > 2 ? '...' : ''}
											</Text>
										</Tooltip>
									</Group>
									<Group wrap="nowrap" gap={5} mt={5}>
										<IconCalendarCheck
											stroke={1.5}
											size={16}
											color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))"
										/>
										<Text fz="xs" c="dimmed">
											Member since {team.Application.length > 0 ? toHumanDate(team.Application[0]?.createdAt) : 'N/A'}
										</Text>
									</Group>
								</GridCol>
							</Grid>
						</Card>
					);
				})}
			</Stack>
		</Box>
	);
}
