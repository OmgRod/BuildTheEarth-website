import { Box, Title } from '@mantine/core';

import { getSession } from '@/util/auth';
import prisma from '@/util/db';
import UsersDatatabe from './datatable';
import { SearchUsers } from './interactivity';

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ page: string | undefined; query: string | undefined }>;
}) {
	const session = await getSession();
	const page = (await searchParams).page;
	const searchQuery = (await searchParams).query;
	const userCount = await prisma.user.count();
	console.log(searchQuery)
	const users = await prisma.user.findMany({
		take: 50,
		skip: (Number(page || '1') - 1) * 50,
		where: searchQuery ?{
			OR: [
				{ username: { contains: searchQuery || undefined } },
				{ minecraft: { contains: searchQuery || undefined } },
				{ discordId: { contains: searchQuery || undefined } },
				{ ssoId: { contains: searchQuery || undefined } },
			],
		}:undefined,
	});

	return (
		<Box mx="md" maw="90vw">
			<Title order={1} mt="xl" mb="md">
				Website Users
			</Title>
			<SearchUsers mb="md" maw="30%"/>
			<UsersDatatabe users={users} count={userCount} />
		</Box>
	);
}
