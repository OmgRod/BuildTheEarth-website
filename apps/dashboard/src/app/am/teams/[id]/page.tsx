import Anchor from '@/components/core/Anchor';
import { TextCard } from '@/components/core/card/TextCard';
import { BuildTeamDisplay } from '@/components/data/BuildTeam';
import { UserDisplay } from '@/components/data/User';
import { Protection } from '@/components/Protection';
import { getReviewActivityScore } from '@/util/application/reviewActivity';
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
	Rating,
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
	IconClock,
	IconClockCheck,
	IconClockExclamation,
	IconClockHour11,
	IconExternalLink,
	IconForms,
	IconInfoSmall,
	IconPhoto,
	IconPolygon,
	IconTag,
	IconUser,
	IconUsers,
} from '@tabler/icons-react';
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
	const oldestApplication = await prisma.application.findFirst({
		where: { buildteamId: id, status: 'SEND' },
		orderBy: { createdAt: 'asc' },
		take: 1,
		select: { createdAt: true },
	});
	const reviewActivity = await getReviewActivityScore(id);

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
							{reviewActivity.par > 30 ? (
								<Tooltip label="The BuildTeam seems to lack behind on reviewing applications.">
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
								{reviewActivity.ras < 2 ? (
									<Alert
										variant="light"
										style={{ border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-red-outline)' }}
										color="red"
										radius="md"
										title="Low review activity"
										icon={<IconClockExclamation />}
									>
										This BuildTeam&apos;s review activity score is critically low. This indicates significant problems
										with the review process, likely due to many pending applications or long review times. Please get in
										contact with the BuildTeam to resolve this issue.
									</Alert>
								) : reviewActivity.ras < 3.75 ? (
									<Alert
										variant="light"
										style={{
											border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-orange-outline)',
										}}
										color="orange"
										radius="md"
										title="Moderate review activity"
										icon={<IconClock />}
									>
										This BuildTeam&apos;s review activity score is below a good level. This indicates that there are
										areas where application review can be improved, possibly from pending application backlogs or
										longer-than-desired review times. Please get in contact with the BuildTeam to prevent this from
										getting worse.
									</Alert>
								) : (
									<Alert
										variant="light"
										style={{ border: 'calc(0.0625rem* var(--mantine-scale)) solid var(--mantine-color-green-outline)' }}
										color="green"
										radius="md"
										title={`${reviewActivity.ras > 4.5 ? 'Perfect' : 'Good'} review activity`}
										icon={<IconClockCheck />}
									>
										The review activity score of this BuildTeam is above 3.75. This means that the BuildTeam is
										performing well in reviewing applications. This is a good sign, and the BuildTeam is likely to be
										efficient in reviewing applications.
									</Alert>
								)}
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
								<TextCard title="Average Review Time" icon={IconClock} isText>
									<NumberFormatter value={reviewActivity.art} thousandSeparator suffix=" Days" />
								</TextCard>
							</GridCol>
							<GridCol span={4}>
								<TextCard title="Pending Application Ratio" icon={IconClockExclamation} isText>
									<NumberFormatter value={reviewActivity.par} thousandSeparator suffix="%" />
								</TextCard>
							</GridCol>
							<GridCol span={4} h="100%">
								<TextCard title="Review Efficiency Score" icon={IconClockHour11} style={{ height: '100%' }}>
									<Rating value={reviewActivity.res} fractions={2} readOnly />
								</TextCard>
							</GridCol>
							<GridCol span={4} h="100%">
								<TextCard title="Pending Score" icon={IconClockHour11} style={{ height: '100%' }}>
									<Rating value={reviewActivity.ps / 2} fractions={2} readOnly />
								</TextCard>
							</GridCol>
							<GridCol span={4} h="100%">
								<TextCard title="Review Activity Score" icon={IconClockHour11} style={{ height: '100%' }}>
									<Rating value={reviewActivity.ras} fractions={2} readOnly />
								</TextCard>
							</GridCol>
						</Grid>
					</GridCol>
				</Grid>

				<pre>{JSON.stringify(reviewActivity, null, 2)}</pre>
			</Box>
		</Protection>
	);
}
