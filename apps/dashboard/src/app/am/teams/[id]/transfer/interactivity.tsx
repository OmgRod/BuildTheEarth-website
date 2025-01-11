'use client';

import { Alert, Box, Button, SimpleGrid, Stepper, Text, Title, rem } from '@mantine/core';
import {
	Icon,
	IconBrandDiscord,
	IconCalendar,
	IconExclamationCircle,
	IconForms,
	IconMessage,
	IconPhoto,
	IconPolygon,
	IconProps,
	IconQuestionMark,
	IconReload,
	IconTrash,
	IconUsers,
	IconUsersGroup,
} from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes, useActionState, useState } from 'react';

import { transferTeam } from '@/app/actions';
import { BuildTeamSelect } from '@/components/input/BuildTeamSelect';
import { openConfirmModal } from '@mantine/modals';

export default function TransferStepper({ id }: { id: string }) {
	const [activeStep, setActiveStep] = useState(0);
	const [destinationTeam, setDestinationTeam] = useState<string | null>(null);
	const [curentState, transferTeamAction, isLoading] = useActionState(transferTeam, {});

	const steps: {
		id: string;
		icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
		title: string;
		description: string;
		button: string;
	}[] = [
		{
			id: 'move-claims',
			icon: IconPolygon,
			title: 'Move Claims',
			description: `Transfer all claims made by this team to the destination team.`,
			button: 'Claims',
		},
		{
			id: 'move-showcases',
			icon: IconPhoto,
			title: 'Move Showcase Images',
			description: `Transfer all showcase images made by this team to the destination team.`,
			button: 'Showcase Images',
		},
		{
			id: 'move-calendar',
			icon: IconCalendar,
			title: 'Move Calendar Events',
			description: `Transfer all calendar events made by this team to the destination team.`,
			button: 'Calendar Events',
		},
		{
			id: 'copy-members',
			icon: IconUsersGroup,
			title: 'Add Members',
			description: `Add all members of this team to the destination team.`,
			button: 'Members',
		},
		{
			id: 'delete-applications',
			icon: IconForms,
			title: 'Delete Applications',
			description: `Delete all applications to this team.`,
			button: 'Applications',
		},
		{
			id: 'delete-application-questions',
			icon: IconQuestionMark,
			title: 'Delete Application Questions',
			description: `Delete all application questions of this team.`,
			button: 'Application Questions',
		},
		{
			id: 'delete-application-responses',
			icon: IconMessage,
			title: 'Delete Application Response Templates',
			description: `Delete all application response templates of this team.`,
			button: 'Application Response Templates',
		},
		{
			id: 'delete-socials',
			icon: IconBrandDiscord,
			title: 'Delete Socials',
			description: `Delete all socials of this team.`,
			button: 'Socials',
		},
		{
			id: 'delete-permissions',
			icon: IconUsers,
			title: 'Remove Managers',
			description: `Remove all users with special permissions from this team.`,
			button: 'Managers',
		},
		{
			id: 'remove-members',
			icon: IconUsersGroup,
			title: 'Remove Members',
			description: `Remove all users from this team.`,
			button: 'Members',
		},
		{
			id: 'delete-team',
			icon: IconTrash,
			title: 'Delete Team',
			description: `Delete this team.`,
			button: 'Team',
		},
		{
			id: 'reload-data',
			icon: IconReload,
			title: 'Refresh Data',
			description: `Refreshes all data on the destination team.`,
			button: 'Reload & Finish',
		},
	];

	return (
		<SimpleGrid cols={2} spacing={'md'}>
			<Box>
				<Title order={2}>Transfer Steps</Title>
				<Text size="sm" mb="md" c="dimmed">
					Click the button on the right to complete the current step.
				</Text>
				<Stepper
					active={activeStep}
					onStepClick={setActiveStep}
					orientation="vertical"
					allowNextStepsSelect={false}
					color="red"
					w="100%"
				>
					{steps.map((step) => (
						<Stepper.Step
							label={step.title}
							description={step.description}
							key={step.id}
							icon={<step.icon style={{ width: rem(18), height: rem(18) }} />}
							allowStepSelect={false}
						/>
					))}
				</Stepper>
			</Box>
			<Box>
				<Alert title="Warning" color="red" mb="md" icon={<IconExclamationCircle />}>
					Actions performed on this page are irreversible and cause heavy data mutations. Please be careful of what you
					are doing here. You will need to confirm every action. To get started, select the destination team you want to
					transfer some of the data (Showcase Images, Claims, Members, Calendar Events) to below.
				</Alert>

				<BuildTeamSelect
					value={destinationTeam}
					onChange={setDestinationTeam}
					searchable
					label="Destination Team"
					description="Select the team you want to transfer the data to."
				/>
				<Button
					mt="xl"
					color="red"
					fullWidth
					disabled={activeStep === steps.length || !destinationTeam}
					loading={isLoading}
					onClick={() =>
						openConfirmModal({
							title: 'Confirm Action',
							centered: true,
							confirmProps: { color: 'red' },
							children: (
								<Text size="sm">
									Are you sure you want to perform this action? This action is irreversible and will cause heavy data
									mutations.
								</Text>
							),
							labels: { confirm: 'Confirm', cancel: 'Cancel' },
							onConfirm: () => {
								if (!destinationTeam) return;
								transferTeamAction({ id, destinationId: destinationTeam, step: steps[activeStep].id });
								setActiveStep(activeStep + 1);
							},
						})
					}
				>
					Confirm Step: {steps[activeStep]?.button || 'Finish'}
				</Button>
				<pre>{JSON.stringify(curentState)}</pre>
			</Box>
		</SimpleGrid>
	);
}
