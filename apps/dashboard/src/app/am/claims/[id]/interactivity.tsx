'use client';

import { adminChangeTeam } from '@/actions/claims';
import { BuildTeamDisplay } from '@/components/data/BuildTeam';
import { BuildTeamSelect } from '@/components/input/BuildTeamSelect';
import { useFormAction } from '@/hooks/useFormAction';
import { hasRole } from '@/util/auth';
import {
	ActionIcon,
	Button,
	Menu,
	MenuDropdown,
	MenuItem,
	MenuLabel,
	MenuTarget,
	Paper,
	rem,
	Title,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { BuildTeam, Claim } from '@repo/db';
import { IconDots, IconTransfer } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export function EditMenu({ claim }: { claim: Claim & { buildTeam: BuildTeam } }) {
	const session = useSession();

	return (
		<Menu>
			<MenuTarget>
				<ActionIcon
					size="lg"
					variant="subtle"
					color="gray"
					aria-label="More Actions"
					disabled={!hasRole(session.data, 'edit-claims')}
				>
					<IconDots style={{ width: '70%', height: '70%' }} stroke={1.5} />
				</ActionIcon>
			</MenuTarget>
			<MenuDropdown>
				<MenuLabel>Edit</MenuLabel>
				<MenuItem
					leftSection={<IconTransfer style={{ width: rem(14), height: rem(14) }} />}
					aria-label="Transfer Claim to other buildteam"
					rel="noopener"
					onClick={() => {
						modals.open({
							id: 'change-buildteam',
							centered: true,
							title: 'Change assigned BuildTeam',
							size: 'lg',
							children: <ChangeBuildTeamModal claim={claim} />,
						});
					}}
				>
					Change BuildTeam
				</MenuItem>
			</MenuDropdown>
		</Menu>
	);
}

export function ChangeBuildTeamModal({ claim }: { claim: Claim & { buildTeam: BuildTeam } }) {
	const [changeTeamAction, isPending] = useFormAction(adminChangeTeam);
	const [destinationTeam, setDestinationTeam] = useState<string | null>(null);
	return (
		<>
			<Title order={5} mb="sm">
				Active BuildTeam
			</Title>
			<Paper withBorder p="md" w="fit-content">
				<BuildTeamDisplay team={claim.buildTeam} />
			</Paper>
			<Title order={5} mt="md" mb="sm">
				New BuildTeam
			</Title>
			<BuildTeamSelect
				onChange={setDestinationTeam}
				searchable
				id="destinationTeam"
				description="Select the team you want to transfer the claim to."
			/>
			<Button
				type="submit"
				mt="md"
				fullWidth
				leftSection={<IconTransfer size={14} />}
				loading={isPending}
				disabled={!destinationTeam}
				onClick={() => {
					changeTeamAction({ claimId: claim.id, teamId: destinationTeam });
					modals.closeAll();
				}}
			>
				Change BuildTeam
			</Button>
		</>
	);
}
