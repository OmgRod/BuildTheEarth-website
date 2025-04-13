import { Alert, Box, Tabs, TabsList, TabsPanel, TabsTab, Title } from '@mantine/core';

import { Protection } from '@/components/Protection';
import prisma from '@/util/db';
import { IconExclamationCircle, IconTransfer, IconUserCog } from '@tabler/icons-react';
import { ChangeOwner, TransferStepper } from './interactivity';

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ ref?: string }>;
}) {
	const id = (await params).id;
	const ref = (await searchParams).ref || 'change';

	const team = await prisma.buildTeam.findFirst({
		where: { id },
		include: { creator: { select: { id: true, username: true, ssoId: true } } },
	});

	if (!team) {
		return (
			<Box mx="md" maw="90vw">
				<Title order={1} mt="xl" mb="md">
					Transfer and Delete BuildTeam
				</Title>
				<Alert title="Team not found" icon={<IconExclamationCircle />} mb="lg" />
			</Box>
		);
	}

	return (
		<Protection requiredRole="transfer-team">
			<Box mx="md" maw="90vw">
				<Title order={1} mt="xl" mb="md">
					Transfer and Delete {team?.name}
				</Title>
				<Tabs defaultValue={ref} color="red">
					<TabsList>
						<TabsTab value="change" leftSection={<IconUserCog size={14} />}>
							Change Owner
						</TabsTab>
						<TabsTab value="transfer" leftSection={<IconTransfer size={14} />}>
							Transfer Data
						</TabsTab>
					</TabsList>

					<TabsPanel value="change" pt="md">
						<ChangeOwner id={id} />
					</TabsPanel>

					<TabsPanel value="transfer" pt="md">
						<TransferStepper id={id} />
					</TabsPanel>
				</Tabs>
			</Box>
		</Protection>
	);
}
