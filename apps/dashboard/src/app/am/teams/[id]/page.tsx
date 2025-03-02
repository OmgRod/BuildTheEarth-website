import Anchor from '@/components/core/Anchor';
import { TextCard } from '@/components/core/card/TextCard';
import { BuildTeamDisplay } from '@/components/data/BuildTeam';
import { UserDisplay } from '@/components/data/User';
import { Protection } from '@/components/Protection';
import { toHumanDateTime } from '@/util/date';
import prisma from '@/util/db';
import { applicationStatusToColor } from '@/util/transformers';
import {
	Alert,
	Box,
	Button,
	Flex,
	Grid,
	GridCol,
	Group,
	Image,
	NumberFormatter,
	RingProgress,
	ScrollAreaAutosize,
	SimpleGrid,
	Text,
	ThemeIcon,
	Title,
	Tooltip,
} from '@mantine/core';
import {
	IconAlertCircle,
	IconBrandDiscord,
	IconBrandMinecraft,
	IconCalendar,
	IconCamera,
	IconChecklist,
	IconChecks,
	IconClock,
	IconClockCheck,
	IconClockExclamation,
	IconExternalLink,
	IconForms,
	IconInfoSmall,
	IconPhoto,
	IconPolygon,
	IconTag,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
import moment from 'moment';
import Link from 'next/link';
import { EditMenu } from './interactivity';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;

	const team = await prisma.buildTeam.findFirst({
		where: { id },
		include: {
			creator: { select: { id: true, username: true, ssoId: true } },
			socials: true,
			responseTemplate: { select: { id: true, name: true, content: true } },
			UserPermission: {
				select: {
					id: true,
					permission: { select: { defaultValue: true, global: true, id: true } },
					user: { select: { id: true, username: true, ssoId: true } },
				},
			},
			_count: {
				select: {
					claims: true,
					members: true,
					showcases: true,
					Application: true,
				},
			},
		},
	});
	if (!team) throw Error('Could not find BuildTeam');

	const teamApplicationsByStatus = await prisma.application.groupBy({
		where: { buildteamId: id },
		by: ['status'],
		_count: true,
	});
	const teamAveragePending =
		((teamApplicationsByStatus.find((a) => a.status == 'SEND')?._count || 0) /
			teamApplicationsByStatus.reduce((total, a) => total + a._count, 0)) *
		100;

	const globalApplicationsByStatus = await prisma.application.groupBy({
		by: ['status'],
		_count: true,
	});
	const globalAveragePending =
		((globalApplicationsByStatus.find((a) => a.status == 'SEND')?._count || 0) /
			globalApplicationsByStatus.reduce((total, a) => total + a._count, 0)) *
		100;

	const oldestApplication = await prisma.application.findFirst({
		where: { buildteamId: id, status: 'SEND' },
		orderBy: { createdAt: 'asc' },
		take: 1,
		select: { createdAt: true },
	});
	const newestApplication = await prisma.application.findFirst({
		where: { buildteamId: id, status: 'SEND' },
		orderBy: { createdAt: 'desc' },
		take: 1,
		select: { createdAt: true },
	});

	return (
		<Protection requiredRole="get-teams">
			<Box mx="md" maw="90vw">
				<Group justify="space-between" w="100%" mt="xl" mb="md">
					<Title order={1}>{team.name}</Title>
					<Group gap="xs">
						<Button
							variant="light"
							color="cyan"
							component={Link}
							href={`https://buildtheearth.net/teams/${team.slug}`}
							target="_blank"
							rightSection={<IconExternalLink size={14} />}
						>
							Open on Website
						</Button>
						<EditMenu team={team} />
					</Group>
				</Group>
				<SimpleGrid cols={2}>
					<Flex h="100%" mih={50} gap="md" justify="flex-start" align="flex-start" direction="column">
						<TextCard
							title={`About ${team.name}`}
							icon={IconInfoSmall}
							style={{ width: '100%', height: '100%', flexGrow: 1 }}
						>
							<ScrollAreaAutosize h="100%" type="auto" offsetScrollbars>
								<div dangerouslySetInnerHTML={{ __html: team.about }} />
							</ScrollAreaAutosize>
						</TextCard>
					</Flex>
					<Grid>
						<GridCol span={12}>
							<TextCard title="Banner" icon={IconPhoto}>
								<Image src={team.backgroundImage} alt="Banner" style={{ aspectRatio: '16 / 9' }} w="100%" radius="md" />
							</TextCard>
						</GridCol>
						<GridCol span={6}>
							<TextCard title="Public Representation" icon={IconCamera}>
								<BuildTeamDisplay team={team} />
							</TextCard>
						</GridCol>
						<GridCol span={6}>
							<TextCard title="Team Owner" icon={IconUser}>
								<UserDisplay user={team.creator as any} />
							</TextCard>
						</GridCol>
						<GridCol span={4}>
							<TextCard title="Discord Link" icon={IconBrandDiscord}>
								<Anchor href={team.invite} target="_blank">
									{team.invite.replace('https://discord', '')}
								</Anchor>
							</TextCard>
						</GridCol>
						<GridCol span={5}>
							<TextCard title="Server IP" icon={IconBrandMinecraft}>
								<Anchor href={team.ip} target="_blank">
									{team.ip}
								</Anchor>
							</TextCard>
						</GridCol>
						<GridCol span={3}>
							<TextCard title="Slug" icon={IconTag}>
								{team.slug}
							</TextCard>
						</GridCol>
						<GridCol span={6} h="100%">
							<TextCard title="Minecraft Version" icon={IconBrandMinecraft} style={{ height: '100%' }}>
								{team.version}
							</TextCard>
						</GridCol>

						<GridCol span={6} h="100%">
							<TextCard title="Created At" isText icon={IconCalendar} style={{ height: '100%' }}>
								{toHumanDateTime(team.createdAt)}
							</TextCard>
						</GridCol>
					</Grid>
				</SimpleGrid>
				<Title order={2} mt="xl" mb="md">
					Statistics
				</Title>
				<Grid>
					<GridCol span={3}>
						<TextCard title="Members" icon={IconUsers} isText>
							<NumberFormatter value={team._count.members} thousandSeparator suffix=" Members" />
						</TextCard>
					</GridCol>
					<GridCol span={3}>
						<TextCard title="Applications" icon={IconForms}>
							<Text fz="24px" fw={700} lh="1" pb={0}>
								<NumberFormatter value={team._count.Application} thousandSeparator suffix=" Applications" />
							</Text>
							{teamAveragePending > globalAveragePending ? (
								<Tooltip label="The BuildTeam seems to have a high number of pending applications.">
									<ThemeIcon color="red" size="sm" variant="outline" style={{ border: 'none' }}>
										<IconAlertCircle style={{ width: '70%', height: '70%' }} />
									</ThemeIcon>
								</Tooltip>
							) : undefined}
						</TextCard>
					</GridCol>
					<GridCol span={3}>
						<TextCard title="Claims" icon={IconPolygon} isText>
							<NumberFormatter value={team._count.claims} thousandSeparator suffix=" Claims" />
						</TextCard>
					</GridCol>
					<GridCol span={3}>
						<TextCard title="Showcase Images" icon={IconPhoto} isText>
							<NumberFormatter value={team._count.showcases} thousandSeparator suffix=" Images" />
						</TextCard>
					</GridCol>
				</Grid>
				<Title order={2} mt="xl" mb="md">
					Applications
				</Title>
				{!team.allowApplications ? (
					<Alert
						variant="light"
						style={{ border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-yellow-outline)' }}
						color="yellow"
						mb="md"
						radius="md"
						title="Disabled Applications"
						icon={<IconForms />}
					>
						The applications to {team.name} are disabled. This means that no new applications can be submitted to this
						BuildTeam. This might be due to a high number of pending applications, or other reasons. Please note, that
						the graphics below might not be accurate, as they are based on the latest data available.
					</Alert>
				) : undefined}
				<Grid>
					<GridCol span={3}>
						<TextCard title="Application Status" icon={IconChecklist}>
							<RingProgress
								h="100%"
								w="100%"
								size={300}
								thickness={50}
								sections={teamApplicationsByStatus.map((a) => ({
									value: (a._count / team._count.Application) * 100,
									tooltip: `${a.status.slice(0, 1).toUpperCase()}${a.status.slice(1).toLowerCase()}: ${a._count} (${Math.round((a._count / team._count.Application) * 1000) / 10}%)`,
									color: applicationStatusToColor(a.status),
								}))}
							/>
						</TextCard>
					</GridCol>
					<GridCol span={9}>
						<Grid>
							<GridCol span={12}>
								{globalAveragePending - teamAveragePending < -5 ? (
									<Alert
										variant="light"
										style={{ border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-red-outline)' }}
										color="red"
										radius="md"
										title="High number of pending applications"
										icon={<IconClockExclamation />}
									>
										About <NumberFormatter value={teamAveragePending} decimalScale={2} suffix="%" /> of applications to
										this BuildTeam are currently pending review. This number is higher than the global average of{' '}
										<NumberFormatter value={globalAveragePending} decimalScale={2} suffix="%" />. Please get in contact
										with the staff team of {team.name} to solve this issue as fast as possible. Check the other
										statistics on this page for potential reasons. Current deficit:{' '}
										<NumberFormatter
											value={(globalAveragePending - teamAveragePending) * -1}
											decimalScale={1}
											suffix="%"
										/>
									</Alert>
								) : globalAveragePending - teamAveragePending < 0 ||
								  (teamApplicationsByStatus.find((a) => a.status == 'SEND')?._count || 0) > 10 ? (
									<Alert
										variant="light"
										style={{
											border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-orange-outline)',
										}}
										color="orange"
										radius="md"
										title="Moderate number of pending applications"
										icon={<IconClock />}
									>
										About <NumberFormatter value={teamAveragePending} decimalScale={2} suffix="%" /> of applications to
										this BuildTeam are currently pending review.{' '}
										{globalAveragePending - teamAveragePending < 0 ? (
											<>
												This number is higher than the global average of{' '}
												<NumberFormatter value={globalAveragePending} decimalScale={2} suffix="%" />, but still
												tolerable.
											</>
										) : (
											<>This equals to more than 10 Applications, which is still tolerable.</>
										)}{' '}
										Please get in contact with the staff team of {team.name} to prevent this number from rising further.
										Current deficit:{' '}
										<NumberFormatter
											value={Math.abs(globalAveragePending - teamAveragePending)}
											decimalScale={1}
											suffix="%"
										/>
									</Alert>
								) : (
									<Alert
										variant="light"
										style={{ border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-green-outline)' }}
										color="green"
										radius="md"
										title="Perfect review activity"
										icon={<IconClockCheck />}
									>
										About <NumberFormatter value={teamAveragePending} decimalScale={2} suffix="%" /> of applications to
										this BuildTeam are currently pending review. This number is lower than the global average of{' '}
										<NumberFormatter value={globalAveragePending} decimalScale={2} suffix="%" />. There are no problems
										with review activity in this team. Current surplus:{' '}
										<NumberFormatter value={globalAveragePending - teamAveragePending} decimalScale={1} suffix="%" />
									</Alert>
								)}
							</GridCol>

							<GridCol span={4}>
								<TextCard title="Reviewers" icon={IconUser} isText>
									<NumberFormatter
										value={team.UserPermission.filter((p) => p.permission.id == 'team.application.review').length}
										thousandSeparator
										suffix=" Reviewers"
									/>
								</TextCard>
							</GridCol>
							<GridCol span={4}>
								<TextCard title="Acceptance Rate" icon={IconChecks} isText>
									<NumberFormatter
										value={
											team._count.Application /
											((teamApplicationsByStatus.find((a) => a.status == 'ACCEPTED')?._count || 0) +
												(teamApplicationsByStatus.find((a) => a.status == 'TRIAL')?._count || 1))
										}
										decimalScale={0}
										thousandSeparator
										prefix="1 in "
									/>
								</TextCard>
							</GridCol>
							<GridCol span={4}>
								<TextCard title="Trial-Builder Rate" icon={IconChecks} isText>
									<NumberFormatter
										value={
											(teamApplicationsByStatus.find((a) => a.status == 'TRIAL')?._count || 0) /
											+(teamApplicationsByStatus.find((a) => a.status == 'ACCEPTED')?._count || 1)
										}
										decimalScale={0}
										thousandSeparator
										prefix="1 in "
									/>
								</TextCard>
							</GridCol>
							<GridCol span={4}>
								<TextCard title="Pending Reviews" icon={IconClock} isText>
									<NumberFormatter
										value={teamApplicationsByStatus.find((a) => a.status == 'SEND')?._count || 0}
										thousandSeparator
										suffix=" Applications"
									/>
								</TextCard>
							</GridCol>
							<GridCol span={4}>
								<TextCard title="Oldest pending Application" icon={IconClockExclamation} isText>
									{oldestApplication ? moment(oldestApplication.createdAt).fromNow() : 'No pending Applications'}
								</TextCard>
							</GridCol>
							<GridCol span={4}>
								<TextCard title="Newest pending Application" icon={IconClockExclamation} isText>
									{newestApplication ? moment(newestApplication.createdAt).fromNow() : 'No pending Applications'}
								</TextCard>
							</GridCol>
						</Grid>
					</GridCol>
				</Grid>

				{/* <pre>{JSON.stringify(team, null, 2)}</pre> */}
			</Box>
		</Protection>
	);
}
