import { Box, Button, Group, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';
import prisma from '@/util/db';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import ClaimsDatatable from './datatable';
import { SearchClaims } from './interactivity';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ page: string | undefined; query: string | undefined }>;
}) {
	const page = (await searchParams).page;
	const searchQuery = (await searchParams).query;
	const claimCount = await prisma.claim.count({
		where: searchQuery
			? {
					OR: [
						{ city: { contains: searchQuery || undefined } },
						{ id: { contains: searchQuery || undefined } },
						{ externalId: { contains: searchQuery || undefined } },
						{ name: { contains: searchQuery || undefined } },
						{ osmName: { contains: searchQuery || undefined } },
						{ owner: { username: { contains: searchQuery || undefined } } },
						{ owner: { minecraft: { contains: searchQuery || undefined } } },
						{ owner: { discordId: { contains: searchQuery || undefined } } },
						{ owner: { ssoId: { contains: searchQuery || undefined } } },
					],
				}
			: undefined,
	});
	const claims = await prisma.claim.findMany({
		take: 20,
		skip: (Number(page || '1') - 1) * 20,
		where: searchQuery
			? {
					OR: [
						{ city: { contains: searchQuery || undefined } },
						{ id: { contains: searchQuery || undefined } },
						{ externalId: { contains: searchQuery || undefined } },
						{ name: { contains: searchQuery || undefined } },
						{ osmName: { contains: searchQuery || undefined } },
						{ owner: { username: { contains: searchQuery || undefined } } },
						{ owner: { minecraft: { contains: searchQuery || undefined } } },
						{ owner: { discordId: { contains: searchQuery || undefined } } },
						{ owner: { ssoId: { contains: searchQuery || undefined } } },
					],
				}
			: undefined,
		include: { owner: true, buildTeam: { select: { id: true, slug: true, icon: true, name: true } } },
		orderBy: { createdAt: 'desc' },
	});

	return (
		<Protection requiredRole="get-claims">
			<Box mx="md" maw="90vw">
				<Group justify="space-between" w="100%" mt="xl" mb="md">
					<Title order={1}>Claims</Title>
					<Group gap="xs">
						<Button
							variant="light"
							color="cyan"
							component={Link}
							href={`https://buildtheearth.net/map`}
							target="_blank"
							rightSection={<IconExternalLink size={14} />}
						>
							Open Map
						</Button>
					</Group>
				</Group>
				<SearchClaims mb="md" maw="30%" />
				<ClaimsDatatable claims={claims} count={claimCount} />
			</Box>
		</Protection>
	);
}
