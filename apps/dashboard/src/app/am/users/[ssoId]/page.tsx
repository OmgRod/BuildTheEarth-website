'use server';

import {
	KeycloakGroup,
	KeycloakSession,
	KeycloakUser,
	KeycloakuserConsent,
	KeycloakUserCredential,
} from '@/types/Keycloak';
import { capitalize, snakeCaseToStartCase } from '@/util/string';
import {
	Box,
	ColorSwatch,
	Flex,
	Grid,
	GridCol,
	Group,
	SimpleGrid,
	Skeleton,
	Table,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import { IconCalendar, IconClockExclamation, IconLink, IconShieldLock, IconSwipe } from '@tabler/icons-react';

import { TextCard } from '@/components/core/card/TextCard';
import { getSession } from '@/util/auth';
import { globalFetcher } from '@/util/data';
import prisma from '@/util/db';
import moment from 'moment';

export default async function Page({ params }: { params: Promise<{ ssoId: string }> }) {
	const session = await getSession();
	const ssoId = (await params).ssoId;
	const keycloakData = await globalFetcher<KeycloakUser>(
		`${process.env.NEXT_PUBLIC_KEYCLOAK_URL?.replace('/realms/website', '')}/admin/realms/website/users/${ssoId}`,
		{ headers: { Authorization: `Bearer ${session?.accessToken}` } },
	);
	const keycloakConsentsData = await globalFetcher<KeycloakuserConsent[]>(
		`${process.env.NEXT_PUBLIC_KEYCLOAK_URL?.replace('/realms/website', '')}/admin/realms/website/users/${ssoId}/consents`,
		{ headers: { Authorization: `Bearer ${session?.accessToken}` } },
	);
	const keycloakCredentialsData = await globalFetcher<KeycloakUserCredential[]>(
		`${process.env.NEXT_PUBLIC_KEYCLOAK_URL?.replace('/realms/website', '')}/admin/realms/website/users/${ssoId}/credentials`,
		{ headers: { Authorization: `Bearer ${session?.accessToken}` } },
	);
	const keycloakGroupsData = await globalFetcher<KeycloakGroup[]>(
		`${process.env.NEXT_PUBLIC_KEYCLOAK_URL?.replace('/realms/website', '')}/admin/realms/website/users/${ssoId}/groups`,
		{ headers: { Authorization: `Bearer ${session?.accessToken}` } },
	);
	const keycloakSessionsData = await globalFetcher<KeycloakSession[]>(
		`${process.env.NEXT_PUBLIC_KEYCLOAK_URL?.replace('/realms/website', '')}/admin/realms/website/users/${ssoId}/sessions`,
		{ headers: { Authorization: `Bearer ${session?.accessToken}` } },
	);

	const websiteData = await prisma.user.findFirst({
		where: { ssoId },
		include: {
			applications: {
				include: {
					buildteam: { select: { slug: true, name: true, icon: true } },
					reviewer: { select: { ssoId: true, username: true } },
				},
			},
			permissions: { include: { buildTeam: { select: { slug: true, name: true, icon: true } } } },
			createdBuildTeams: { select: { slug: true, name: true, icon: true } },
			joinedBuildTeams: { select: { slug: true, name: true, icon: true } },
			verifications: { select: { createdAt: true } },
			claims: {
				select: {
					id: true,
					city: true,
					center: true,
					createdAt: true,
					buildTeam: { select: { slug: true, name: true, icon: true } },
					name: true,
					size: true,
					buildings: true,
				},
			},
			claimsBuilder: {
				select: {
					id: true,
					city: true,
					center: true,
					createdAt: true,
					buildTeam: { select: { slug: true, name: true, icon: true } },
					size: true,
					buildings: true,
					name: true,
					owner: { select: { ssoId: true, username: true } },
				},
			},
		},
	});

	if (!websiteData) throw Error('Could not find User');

	return (
		<Box mx="md" maw="90vw">
			<Flex gap="sm" justify="flex-start" align="flex-end" direction="row" wrap="nowrap" mt="xl" mb="md">
				<Title order={1}>{websiteData.username}</Title>
				<Text c="dimmed" fz="sm">
					({keycloakData.email})
				</Text>
			</Flex>
			<SimpleGrid cols={2}>
				<Skeleton w="100%" h="100%" />
				<Grid h="100%" styles={{ inner: { height: 'calc(100% + var(--mantine-spacing-md))' } }}>
					<GridCol span={6}>
						<TextCard title="Account Security" icon={IconShieldLock} subtitle="Account's Security Status">
							<Group gap={6}>
								<Tooltip label={'Account enabled? ' + (keycloakData.enabled ? 'Yes' : 'No')}>
									<ColorSwatch
										color={keycloakData.enabled ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'}
										radius="sm"
										size="24px"
									/>
								</Tooltip>
								<Tooltip
									label={'Federated Identities linked? ' + (keycloakData.federatedIdentities.length > 0 ? 'Yes' : 'No')}
								>
									<ColorSwatch
										color={
											keycloakData.federatedIdentities.length > 0
												? 'var(--mantine-color-green-7)'
												: 'var(--mantine-color-red-7)'
										}
										radius="sm"
										size="24px"
									/>
								</Tooltip>
								<Tooltip
									label={
										'Email verified? ' +
										(keycloakData.email ? (keycloakData.emailVerified ? 'Yes' : 'No') : 'No Email set')
									}
								>
									<ColorSwatch
										color={
											keycloakData.email
												? keycloakData.emailVerified
													? 'var(--mantine-color-green-7)'
													: 'var(--mantine-color-orange-7)'
												: 'var(--mantine-color-red-7)'
										}
										radius="sm"
										size="24px"
									/>
								</Tooltip>
								<Tooltip label={'Credentials set? ' + (keycloakCredentialsData.length > 0 ? 'Yes' : 'No')}>
									<ColorSwatch
										color={
											keycloakCredentialsData.length > 0 ? 'var(--mantine-color-green-7)' : 'var(--mantine-color-red-7)'
										}
										radius="sm"
										size="24px"
									/>
								</Tooltip>
							</Group>
						</TextCard>
					</GridCol>
					<GridCol span={6}>
						<TextCard
							title="Pending Actions"
							icon={IconClockExclamation}
							subtitle={
								keycloakData.requiredActions.length > 1
									? `And ${keycloakData.requiredActions.length - 1} more...`
									: 'Required Actions can be added in Keycloak'
							}
						>
							{keycloakData.requiredActions.length > 0
								? snakeCaseToStartCase(keycloakData.requiredActions[0])
								: 'No Pending Actions'}
						</TextCard>
					</GridCol>
					<GridCol span={12}>
						<TextCard title="Identity Providers" icon={IconLink}>
							<Table
								highlightOnHover
								data={{
									head: ['Provider', 'User #', 'Username'],
									body: keycloakData.federatedIdentities.map((idp) => [
										capitalize(idp.identityProvider),
										idp.userId,
										idp.userName.replace('#0', ''),
									]),
								}}
							/>
						</TextCard>
					</GridCol>
					<GridCol span={6}>
						<TextCard
							isText
							title="External Consents"
							icon={IconSwipe}
							subtitle={`${keycloakConsentsData.length > 1 ? 'have' : 'has'} been granted from the User's Account`}
						>
							{keycloakConsentsData.length} Consent{keycloakConsentsData.length > 1 ? 's' : ''}
						</TextCard>
					</GridCol>
					<GridCol span={6}>
						<TextCard
							isText
							title="Account Age"
							icon={IconCalendar}
							subtitle={'or since ' + new Date(keycloakData.createdTimestamp).toLocaleDateString()}
						>
							{moment().diff(new Date(keycloakData.createdTimestamp), 'days')} Days
						</TextCard>
					</GridCol>
				</Grid>
			</SimpleGrid>

			{/* <pre>
				{JSON.stringify(keycloakData, null, 2)}
				{JSON.stringify(keycloakConsentsData, null, 2)}
				{JSON.stringify(keycloakCredentialsData, null, 2)}
				{JSON.stringify(keycloakGroupsData, null, 2)}
				{JSON.stringify(keycloakSessionsData, null, 2)}
				{JSON.stringify(websiteData, null, 2)}
			</pre> */}
		</Box>
	);
}
