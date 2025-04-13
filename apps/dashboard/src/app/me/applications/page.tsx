import { Box, Card, Grid, GridCol, Group, Stack, Text, ThemeIcon, Title, Tooltip } from '@mantine/core';

import { BuildTeamDisplay } from '@/components/data/BuildTeam';
import { getSession } from '@/util/auth';
import { toHumanDateTime } from '@/util/date';
import prisma from '@/util/db';
import { applicationStatusToColor, applicationStatusToIcon, applicationStatusToTooltip } from '@/util/transformers';
import { IconCalendar, IconCalendarCheck } from '@tabler/icons-react';
import moment from 'moment';
import Link from 'next/link';

export default async function Page() {
	const session = await getSession();
	const applications = await prisma.application.findMany({
		where: { user: { ssoId: session?.user?.id } },
		select: {
			id: true,
			buildteam: { select: { id: true, slug: true, icon: true, name: true } },
			status: true,
			createdAt: true,
			reviewedAt: true,
			trial: true,
			reason: true,
		},
		orderBy: { createdAt: 'desc' },
	});

	return (
		<Box ml="md" maw="50vw">
			<Title order={1} mt="xl" mb="md">
				Your Applications
			</Title>
			<Text c="dimmed" size="md" mb="lg">
				Applications are requests to join a specific BuildTeam as a member. Each BuildTeam has its own requirements and
				application questions. You can apply to multiple BuildTeams at once, but please keep in mind that each BuildTeam
				reviews applications separately. Click on an application to view its status and your answers.
			</Text>
			<Stack gap="lg">
				{applications
					.sort((a, b) => (a.status === 'SEND' ? -1 : b.status === 'SEND' ? 1 : 0))
					.map((application) => {
						const Icon = applicationStatusToIcon(application.status);
						return (
							<Card
								key={application.id}
								component={Link}
								href={`/me/applications/${application.id}`}
								className="animate-scale"
							>
								<Grid>
									<GridCol span={0.75}>
										<Tooltip label={applicationStatusToTooltip(application.status)}>
											<ThemeIcon
												variant="light"
												radius="xl"
												size="lg"
												color={applicationStatusToColor(application.status)}
											>
												<Icon style={{ width: '70%', height: '70%' }} />
											</ThemeIcon>
										</Tooltip>
									</GridCol>
									<GridCol span={6.25}>
										<Stack>
											<Title order={4}>
												{application.trial ? 'Trial' : 'Builder'} Application {application.id.split('-')[0]}
											</Title>
											<BuildTeamDisplay team={application.buildteam} noAnchor />
										</Stack>
									</GridCol>
									<GridCol span={5}>
										<Group wrap="nowrap" gap={5} mt={5}>
											<IconCalendar
												stroke={1.5}
												size={16}
												color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))"
											/>
											<Text fz="xs" c="dimmed">
												{toHumanDateTime(application.createdAt)}
											</Text>
										</Group>
										<Group wrap="nowrap" gap={5} mt={5}>
											<IconCalendarCheck
												stroke={1.5}
												size={16}
												color="light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))"
											/>
											<Text fz="xs" c="dimmed">
												{application.reviewedAt
													? `${toHumanDateTime(application.reviewedAt)} (${moment.duration(moment(application.createdAt).diff(application.reviewedAt)).humanize()})`
													: `Pending review... (${moment.duration(moment(application.createdAt).diff(moment.now())).humanize()})`}
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
